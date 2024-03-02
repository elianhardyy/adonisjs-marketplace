
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public redirectTo = '/'
  public async handle({response,auth}: HttpContextContract, next: () => Promise<void>) {
    
    if(auth.isAuthenticated){
      return response.redirect(this.redirectTo,true)
    }
    

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
