import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  @slugify({
    strategy:'dbIncrement',
    fields:['name'],
    allowUpdates:true
  })
  public slug:string

  @column()
  public image:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(()=>Product,{foreignKey:'category_id'})
  public product:HasMany<typeof Product>
}
