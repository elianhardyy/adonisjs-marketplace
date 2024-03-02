import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mail from '@ioc:Adonis/Addons/Mail'
import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Token from 'App/Models/Token'

export default class PasswordResetsController {
    public async forgot({view}:HttpContextContract){
        return view.render('password.forgot')
    }
    public async send({request,session,response}:HttpContextContract){
        const emailSchema = schema.create({
            email:schema.string({trim:true,escape:true},[rules.email()])
        })
        const {email} = await request.validate({schema:emailSchema})
        const user = await User.findBy('email',email)
        const token = await Token.generatePasswordResetToken(user)
        const resetLink = Route.makeUrl('PasswordResetsController.reset',[token])
        if(user){
            await Mail.sendLater(message=>{
                message
                    .from('testmail@nice.com')
                    .to(user.email)
                    .subject('Reset Password')
                    .html(`Reset your password by <a href="${Env.get('DOMAIN')}${resetLink}">click here</a>`)
            })
        }
        session.flash('success','Hore')
        return response.redirect('/login')
    }
    public async reset({view,params}:HttpContextContract){
        const token = params.token
        const isValid = await Token.verify(token,'PASSWORD_RESET')
        return view.render('password/reset',{isValid,token})
    }
    public async store({request,response,auth,session}:HttpContextContract){
        const passwordSchema = schema.create({
            tokenp : schema.string({trim:true,escape:true}),
            password:schema.string({trim:true,escape:true},[rules.minLength(8)])
        })
        const {tokenp,password} = await request.validate({schema:passwordSchema})
        const user = await Token.getTokenUser(tokenp)
        if (!user) {
            session.flash('error', 'Token expired or associated user could not be found')
            return response.redirect().back()
          }
      
          await user.merge({ password }).save()
          await auth.login(user)
          await Token.expireTokens(user)
      
          return response.redirect().toPath('/')
    }
}
