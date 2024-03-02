import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, belongsTo, BelongsTo, computed, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Roles from 'App/Enums/Roles'
import Comment from './Comment'
import Cart from './Cart'
import Store from './Store'
import Token from './Token'
import Order from './Order'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId:number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
  
  @computed()
  public get isAdmin(){
    return this.roleId === Roles.ADMIN
  }

  @belongsTo(()=>Role)
  public role:BelongsTo<typeof Role>

  @hasMany(()=>Store,{foreignKey:"user_id"})
  public store:HasMany<typeof Store>

  @hasMany(()=>Comment,{foreignKey:'user_id'})
  public comments:HasMany<typeof Comment>

  @hasMany(()=>Cart,{foreignKey:'user_id'})
  public cart:HasMany<typeof Cart>

  @hasMany(()=>Order,{foreignKey:'user_id'})
  public order:HasMany<typeof Order>

  @hasMany(() => Token)
  public tokens: HasMany<typeof Token>

  @hasMany(() => Token, {
    onQuery: query => query.where('type', 'PASSWORD_RESET')
  })
  public passwordResetTokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
