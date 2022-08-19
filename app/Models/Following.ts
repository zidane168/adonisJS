import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Following extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column( )
  public user_id: number

  @column( )
  public following_id: number

  @column.dateTime({ autoCreate: true })
  public created: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated: DateTime
}
