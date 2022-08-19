import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany, hasOne, HasOne, manyToMany, ManyToMany, hasManyThrough} from '@ioc:Adonis/Lucid/Orm'
import Post from "App/Models/Post"
import Following from "App/Models/Following"

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public bio: string

  @column()
  public avatar: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public enabled: number

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

  @hasMany(() => Post, { // 1 - n
    foreignKey: 'user_id'
  } ) 
  public posts: HasMany<typeof Post>

  @hasMany(() => Following, {
    foreignKey: 'user_id'
  }) 
  public followings: HasMany<typeof Following>

  public async followers() {
    const follower = await Following.query().where('following_id', this.id)
    return follower.length
  }

  // @hasOne(() => Profile) // 1 - 1
  // public profile: HasOne<typeof Profile>

  // @manyToMany(() => Skill) 
  // public skills: ManyToMany<typeof Skill> 

  // @hasManyThrough(() => Project, () => Team) 
  // public projects: hasManyThrough<typeof Project>
 
}
