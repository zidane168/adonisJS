import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany} from '@ioc:Adonis/Lucid/Orm'
import Post from "App/Models/Post"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public created: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Post, {
    foreignKey: 'user_id'
  } ) 
  public posts: HasMany<typeof Post>
 
}
