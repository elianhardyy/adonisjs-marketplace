import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store';
import {schema,rules} from '@ioc:Adonis/Core/Validator';
import Application from '@ioc:Adonis/Core/Application'
import { v4 as uuidv4 } from 'uuid'

export default class StoresController {
    public async index({view}:HttpContextContract){
        const store = await Store.all();
        return view.render('store.index',{store});
    }
    public async create({view}:HttpContextContract){
        return view.render('store.create');
    }
    public async store({request,response,session}:HttpContextContract){
        const storeSchema = schema.create({
            name : schema.string({trim:true,escape:true}),
            description : schema.string({trim:true, escape:true}),
            image:schema.file({size:'2mb',extnames:['jpg','png','jpeg']},[rules.nullable()]),
            userId:schema.number([rules.required()])
        })
        const data = await request.validate({schema:storeSchema})
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
        let checkImage = ''
        if(data.image){
            checkImage = `${foldername}/${filename}`
            await data.image.move(Application.tmpPath(foldername),{name:filename})
        }else{
            checkImage = ''
        }
        await Store.create({
            name:data.name,
            description:data.description,
            image :checkImage,
            userId:data.userId
        })

        session.flash('success','store created')
        return response.redirect().toRoute('StoresController.index')
    }
}
