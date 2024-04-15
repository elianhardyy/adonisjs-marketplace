import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import Store from './Store'
import User from './User'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status:string

  @column()
  public qty:number

  @column()
  public token:string

  @column()
  public productId:number

  @column()
  public storeId:number

  @column()
  public userId:number

  @belongsTo(()=>Product)
  public product:BelongsTo<typeof Product>

  @belongsTo(()=>Store)
  public store:BelongsTo<typeof Store>

  @belongsTo(()=>User)
  public user:BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
