import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Product from './Product'
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
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
