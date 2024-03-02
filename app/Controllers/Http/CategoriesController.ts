import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'
import fs from "fs";

export default class CategoriesController {
    //!! INDEX VIEW CATEGORY
    public async index({view}:HttpContextContract){
        const category = await Category.all();
        return view.render('admin.categories.index',{category});
    }

    //!! STORE CATEGORY
    public async store({request,response}:HttpContextContract){
        //validation
        const category = schema.create({
            name:schema.string([rules.trim(),rules.required(),rules.escape()]),
            image:schema.file({size:'2mb',extnames:['jpg','png','jpeg']})
        })
        const data = await request.validate({schema:category})
        //set filename
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
        //save in tmp 
        await data.image.move(Application.tmpPath(foldername),{name:filename})
        //create to database
        await Category.create({
            name:data.name,
            image:`${foldername}/${filename}`
        });
        return response.redirect('/category')
    }

    //!! EDIT VIEW CATEGORY
    public async edit ({params,view}:HttpContextContract) {
        const slug = params.slug
        const category = await Category.findBy('slug',slug);
        return view.render('admin.categories.edit',{category});
    }

    //!! UPDATE CATEGORY
    public async update({params,request,session,response}:HttpContextContract){
        
        const id = params.id
        const categorySlug = await Category.findBy('id',id);
        
        const category = schema.create({
            name:schema.string({trim:true,escape:true},[rules.trim(),rules.required(),rules.escape()]),
            image:schema.file({size:'2mb',extnames:['jpg','png','jpeg']})
        });
        const data = await request.validate({schema:category})
        //console.log(data)
        const oldFile = categorySlug?.image;
        const date = new Date();
        const ext = data.image.extname;
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
        //save in tmp 
        const fullFile = `${foldername}/${filename}`;
        let imageFile : string | undefined;
        if(data.image){
            await data.image.move(Application.tmpPath(foldername),{name:filename})
            imageFile = fullFile
            try {
                fs.unlinkSync(`./tmp/${oldFile}`)
            } catch (error) {
                console.log(`delete file is ${error}`)
            }
        }else{
            imageFile = oldFile
        }
        categorySlug?.merge({
            name:data.name,
            image:imageFile
        })
        await categorySlug?.save();
        return response.redirect().toRoute('CategoriesController.index');
    }

    //!! DELETE CATEGORY
    public async destroy({params,response}:HttpContextContract){
        const id = params.id
        const category = await Category.findBy('id',id);
        fs.unlinkSync(`./tmp/${category?.image}`)
        await category?.delete()
        return response.redirect().toRoute('CategoriesController.index');
    }
}
