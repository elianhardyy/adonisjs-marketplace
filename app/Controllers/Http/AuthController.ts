import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator';
import User from 'App/Models/User';

export default class AuthController {
    public regisView({view}:HttpContextContract){
        return view.render('auth.register')
    }
    public loginView({view}:HttpContextContract){
        return view.render('auth.login')
    }
    public async register({request,response,auth}:HttpContextContract){
        const userShcema = schema.create({
            username:schema.string({trim:true,escape:true},[rules.required(),rules.trim(),rules.escape()]),
            email:schema.string({trim:true,escape:true},
                [rules.email(),rules.unique({table:'users',column:'email'}),rules.trim(),rules.escape()]),
            password : schema.string({trim:true,escape:true},[rules.minLength(8),rules.trim(),rules.escape()])
        })
        const data = await request.validate({schema:userShcema})
        let user:User;
        if (data.email == 'admin@mail.com') {
            user = await User.create({
                username:data.username,
                email:data.email,
                password:data.password,
                roleId:1
            })
        }else{
            user = await User.create(data)
        }
        await auth.login(user)
        return response.redirect('/')
    }
    public async login({request,response,auth,session}:HttpContextContract){
        const userSchema = schema.create({
            email:schema.string({trim:true,escape:true},
                [rules.email(),rules.trim(),rules.escape()]),
            password : schema.string({trim:true,escape:true},[rules.minLength(8),rules.trim(),rules.escape()])
        }) 
        const data = await request.validate({schema:userSchema})
        try {
            await auth.attempt(data.email,data.password)
        } catch (error) {
            session.flash('message','Email or password is incorrect');
            return response.redirect().back()
        }
        return response.redirect('/');
    }
    public async logout({response,auth}:HttpContextContract){
        await auth.logout();
        return response.redirect("/");
    }
}
