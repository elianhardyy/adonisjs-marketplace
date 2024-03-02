import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, ManyToMany, belongsTo, column, hasMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'
import Order from './Order'
import Store from './Store'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId:number

  @column()
  public storeId:number

  @column()
  public productId:number

  @belongsTo(()=>User)
  public user:BelongsTo<typeof User>

  @belongsTo(()=>Store)
  public store:BelongsTo<typeof Store>

  @belongsTo(()=>Product)
  public product:BelongsTo<typeof Product>

  @hasMany(()=>Order,{foreignKey:'cart_id'})
  public order:HasMany<typeof Order>

  @manyToMany(()=>Product)
  public extrapro:ManyToMany<typeof Product>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
