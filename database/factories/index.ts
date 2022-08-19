import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

// tao du lieu gia

export const UserFactory = Factory.define(User, ({ faker }) => {
    return {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.paragraph(),
        avatar: faker.image.avatar(),
    }
})
.relation('posts', () => PostFactory)
.build()


// export const PostFactory = Factory.define(Post, ({ faker }) => {
//     return {
//         caption: faker.lorem.paragraph(),
//         image: faker.image.fashion(),
//     }
// })
// .relation('user', () => UserFactory)
// .build()