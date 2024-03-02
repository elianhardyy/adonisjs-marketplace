import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Roles from 'App/Enums/Roles'

export default class Role {
  // .middleware(['auth', 'role:admin'])
  public async handle({ auth, view }: HttpContextContract, next: () => Promise<void>, guards: string[]) {
    const roleIds = guards.map(guard => Roles[guard.toUpperCase()])

    if (!roleIds.includes(auth.user?.roleId)) {
      return view.render('errors.unauthorized')
    }

    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}