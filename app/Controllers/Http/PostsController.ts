import Post from "App/Models/Post" 
import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import Application from '@ioc:Adonis/Core/Application'
import { schema, rules } from "@ioc:Adonis/Core/Validator"

export default class PostsController {

    public async create({ view } : HttpContextContract) {
        return view.render('posts/create')
    }

    public async store({ request, session, auth, response } : HttpContextContract) {
        const req = await request.validate({
            schema: schema.create({  
                caption: schema.string({}),
                image: schema.file({
                    size: '2mb',
                    extnames: ['jpg', 'png', 'jpeg']
                }) 
            }),
            messages: { 
                'caption.required': 'caption field is required',
                'image.required':   'image field is required',
            }
        })

        const photo = req.image
        if (!photo) {
            session.flash({
                notification: {
                    type: 'danger',
                    message: 'Should upload photo for each posts!'
                }
            })
        }
        const imageName = new Date().getTime().toString() + `.${photo.extname}`

        await photo.move(Application.publicPath('posts'), {
            name: imageName
        })

        const post = new Post()
        post.image = `posts/${imageName}`
        post.caption = req.caption
        post.user_id = auth.user.id

        await post.save()
        session.flash({
            notification: {
                type: 'success',
                message: 'Posts save successfully!'
            }
        })
        return response.redirect(`/${auth.user.username}`)
    }

    public async destroy({ params, response, auth, session }: HttpContextContract) {
        const post = Post.query()
            .where('user_id', auth.user.id)
            .andWhere('id', params.post_id) 

        await post.delete()
        session.flash({
            notification: {
                type: 'success',
                message: 'Posts was deleted!'
            }
        })
        return response.redirect('/')

    }
}
