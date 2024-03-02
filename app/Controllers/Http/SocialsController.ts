import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class SocialsController {
    public async google({ally}:HttpContextContract){
        return ally.use('google').redirect()
    }
    public async googleCallback({ally,auth,response}:HttpContextContract){
        const google = ally.use('google')
        if(google.stateMisMatch()){
            return response.redirect('/login');
        }
        const user = await google.user();
        const name = user.name;
        const email : any= user.email; 
        const userEmail = await User.findBy('email',email);
        if(userEmail){
            await auth.login(userEmail)
            return response.redirect('/')
        }else{
            const biodata = await User.create({
                username:name,
                email:email,
                roleId:2
            })
            await auth.login(biodata)
            return response.redirect('/')
        }
    }
}
