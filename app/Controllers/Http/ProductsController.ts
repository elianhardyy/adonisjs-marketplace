import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator';
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'
import Product from 'App/Models/Product';
import Store from 'App/Models/Store';
import Category from 'App/Models/Category';
import Comment from 'App/Models/Comment';
import moment from 'moment';
import Database from '@ioc:Adonis/Lucid/Database';
import fs from "fs"

export default class ProductsController {
    public async index({view,params}:HttpContextContract){
        const slugstore = params.slug
        const store :any= await Store.findBy('slug',slugstore)
        // const storeid = store
        const storeName = store.name;
        const products = (await Product.query().preload('category').preload('store',(user)=>{user.preload('user')}).where('store_id',store.id))
       
        return view.render('products.index',{products,storeName});
    }
    public async adminView({view}:HttpContextContract){
        return view.render('admin.products.create')
    }
    public async detail({params,view}:HttpContextContract){
        const product = await Product.query().preload('category').where('slug',params.pslug).first();
        const store = await Store.findBy('slug',params.slug);
        //const comments = await Comment.query().preload('user');
        ////console.log(product);
        return view.render('products.detail',{product,store});
    }
    public async create({view, params}:HttpContextContract){
        const slugstore = params.slug
        const store :any= await Store.findBy('slug',slugstore)
        const categories = await Category.all();
        return view.render('products.create',{categories,store});
    }
    public async store({request,response,session}:HttpContextContract){
        const productSchema = schema.create({
            name:schema.string({trim:true,escape:true},[rules.required()]),
            description:schema.string({trim:true,escape:true},[rules.required()]),
            qty:schema.number([rules.escape(),rules.trim()]),
            price:schema.number([rules.trim(),rules.escape()]),
            categoryId:schema.number([rules.required()]),
            storeId:schema.number(),
            image:schema.file({size:'2mb',extnames:['jpg','png','jpeg']})
        })
        const data = await request.validate({schema:productSchema});
        const date = new Date();
        const ext = data.image.extname
        //set filename for date
        var month = date.getMonth();
        var monthexc = month < 10 ? '0' + (month+1) : month + 1; 
        var datenum = date.getDate();
        var dateexc = datenum < 10 ? '0'+ datenum : datenum;
        //set filename for time
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        hours < 10 ? '0' + hours : hours;
        minutes < 10 ? '0' + minutes : minutes;
        seconds < 10 ? '0' + seconds : seconds;

        const fileDate = date.getFullYear() + "" + monthexc + "" +dateexc + "-" + hours + "" +minutes + "" + seconds
        const filename:string = fileDate + uuidv4() + '.'+ ext
        const foldername = "uploads"

        const imagesave = `${foldername}/${filename}`
        await data.image.move(Application.tmpPath(foldername),{name:filename})
        const store:any= await Store.findBy('id',data.storeId);
        await Product.create({
            name:data.name,
            description:data.description,
            image:imagesave,
            qty:data.qty,
            price:data.price,
            categoryId:data.categoryId,
            storeId:data.storeId
        });
        //console.log(store);
        session.flash('success',"Product has been added")
        return response.redirect().toRoute('ProductsController.index',{slug:store.slug})
    }

    public async edit({params,view}:HttpContextContract){
        const product = await Product.query().preload('category').where('slug',params.pslug).first();
        const store = await Store.findBy('slug',params.slug);
        const categories = await Category.all()
        return view.render('products.edit',{product,store,categories});
    }

    public async update({params,request,response}:HttpContextContract){
        const id = params.id;
        const productSlug = await Product.findBy('id',id);

        const productSchema = schema.create({
            name:schema.string({trim:true,escape:true},[rules.required()]),
            description:schema.string({trim:true,escape:true},[rules.required()]),
            qty:schema.number([rules.escape(),rules.trim()]),
            price:schema.number([rules.trim(),rules.escape()]),
            categoryId:schema.number([rules.required()]),
            storeId:schema.number(),
            //image:schema.file({size:'2mb',extnames:['jpg','png','jpeg']})
        })
        const data = await request.validate({schema:productSchema});
        
        const oldImage = productSlug?.image;
        
        const date = new Date();
        const imgFile = request.file('image',{size:'2mb',extnames:['jpg','png','jpeg']});
        const ext = imgFile?.extname
        //set filename for date
        var month = date.getMonth();
        var monthexc = month < 10 ? '0' + (month+1) : month + 1; 
        var datenum = date.getDate();
        var dateexc = datenum < 10 ? '0'+ datenum : datenum;
        //set filename for time
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        hours < 10 ? '0' + hours : hours;
        minutes < 10 ? '0' + minutes : minutes;
        seconds < 10 ? '0' + seconds : seconds;

        const fileDate = date.getFullYear() + "" + monthexc + "" +dateexc + "-" + hours + "" +minutes + "" + seconds
        const filename:string = fileDate + uuidv4() + '.'+ ext
        const foldername = "uploads"

        const imagesave = `${foldername}/${filename}`
        
        let imageFile : string | undefined = "";
        const store:any= await Store.findBy('id',data.storeId);
        if(imgFile){
            await imgFile.move(Application.tmpPath(foldername),{name:filename})
            imageFile += imagesave
            try {
                fs.unlinkSync(`./tmp/${oldImage}`)
            } catch (error) {
                console.log(`deleted ${error}`)
            }
        }else{
            imageFile += oldImage
        }
        productSlug?.merge({
            name:data.name,
            description:data.description,
            qty:data.qty,
            categoryId:data.categoryId,
            price:data.price,
            image:imageFile
        })
        await productSlug?.save();
        return response.redirect().toRoute('ProductsController.index',{slug:store.slug});
    }

    public async comments({request,response}:HttpContextContract){
        const commentSchema = schema.create({
            userId:schema.number([rules.required()]),
            productId:schema.number([rules.required()]),
            comments:schema.string({trim:true,escape:true}),
            storeSlug:schema.string({trim:true,escape:true}),
            productSlug:schema.string({trim:true,escape:true})
        })
       
        const data = await request.validate({schema:commentSchema});
        await Comment.create({
            userId:data.userId,
            productId:data.productId,
            comments:data.comments
        })
        return response.redirect().toRoute('ProductsController.detail',{slug:data.storeSlug,pslug:data.productSlug})
    }
    public async readComment({view,params}:HttpContextContract){
        const comments = await Comment.query().preload('user').preload("product").where('product_id',params.id);
        return view.render('products.ajax.comments',{comments,moment});
    }
    public async search({request, view}:HttpContextContract){
        const search = request.input('q');
        console.log(search);
        // const products = await Product.query()
        //                     .where('name','LIKE',`% ${search} %`)
        const products = await Product.query().whereLike('name',`%${search}%`)
        return view.render('products.ajax.search',{products});
    }
}
