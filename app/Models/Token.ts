import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'
import User from './User'

type TokenType = 'PASSWORD_RESET' | 'VERIFY_EMAIL'

export default class Token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number 

  @column()
  public type: string

  @column()
  public token: string

  @column.dateTime()
  public expiresAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public static async generatePasswordResetToken(user: User | null) {
    const token = string.generateRandom(64)
    if (!user) return token
    await Token.expireTokens(user)
    const record = await user.related('tokens').create({
      token,
      type: 'PASSWORD_RESET',
      expiresAt: DateTime.now().plus({hour:1}),
    })

    return record.token
  }

  public static async expireTokens(user: User) {
    await user.related('passwordResetTokens').query().update({
      expiresAt: DateTime.now()
    })
  }

  public static async getTokenUser(token: string) {
    const record = await Token.query()
      .preload('user')
      .where('token', token)
      .where('expiresAt', '>', DateTime.now().toSQL())
      .orderBy('createdAt', 'desc')
      .first()

    return record?.user
  }

  public static async verify(token: string, type: TokenType) {
    const record = await Token.query()
      .where('expiresAt', '>', DateTime.now().toSQL())
      .where('token', token)
      .where('type', type)
      .first()

    return !!record
  }
}