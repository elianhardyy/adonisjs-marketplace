import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Comment from './Comment'
import Store from './Store'
import Order from './Order'
import Cart from './Cart'

export default class Product extends BaseModel {
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
  public qty:number

  @column()
  public price:number

  @column()
  public categoryId:number
  
  @column()
  public storeId:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>Category)
  public category:BelongsTo<typeof Category>

  @belongsTo(()=>Store)
  public store:BelongsTo<typeof Store>

  @hasMany(()=>Comment,{foreignKey:'product_id'})
  public comments:HasMany<typeof Comment>

  @hasMany(()=>Order,{foreignKey:'product_id'})
  public order:HasMany<typeof Order>
  
  @hasMany(()=>Cart,{foreignKey:'product_id'})
  public cart:HasMany<typeof Cart>
  
}
