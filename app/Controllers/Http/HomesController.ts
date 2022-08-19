
import HttpContextContract from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post';
import User from 'App/Models/User'

export default class HomesController {

    public async index({ auth, response, view }: HttpContextContract) {

        // Get all post of user followings
        const user = await auth.user?.preload('followings');

        const user_ids = [auth.user?.id, ...auth.user?.followings.map(f => f.following_id)]

        const posts = await Post.query().whereIn('user_id', user_ids).preload('user')

        return view.render('welcome', { posts })
    }
}
