import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column( )
  public caption: string

  @column()
  public image: string

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public created: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated: DateTime

  @column()
  public create_by?: number

  @column() 
  public update_by?: number

  @belongsTo(() => User, {
    foreignKey: 'user_id'
  }) 
  public user: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'create_by'
  })
  public created_by: BelongsTo<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'updated_by',

  })
  public updated_by: BelongsTo<typeof User>
}
