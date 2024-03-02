import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'
import Order from './Order'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Cart from './Cart'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  @slugify({
    strategy:'dbIncrement',
    fields:['name']
  })
  public slug:string

  @column()
  public description:string

  @column()
  public image:string

  @column()
  public userId:number

  @belongsTo(()=>User)
  public user:BelongsTo<typeof User>

  @hasMany(()=>Product,{foreignKey:'store_id'})
  public product:HasMany<typeof Product>
  
  @hasMany(()=>Order,{foreignKey:'store_id'})
  public order:HasMany<typeof Order>

  @hasMany(()=>Cart,{foreignKey:'store_id'})
  public cart:HasMany<typeof Cart>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
