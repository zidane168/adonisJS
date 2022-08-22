
import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import Post from 'App/Models/Post';
import User from 'App/Models/User'

export default class HomesController {

    public async index({ view, auth }: HttpContextContract) {

        // Get all post of user followings
        // const user = await auth.user?.preload('followings');

        let user_ids 
        if (auth.isAuthenticated) {
            await auth.user.preload('followings', (query) => {
                query.where('enabled', true)
            })
            user_ids = [auth.user?.id, ...auth.user?.followings.map(f => f.following_id)]  

        } else {
            const user = await User.all()
            user_ids = user.map(u => u.id)  
        }
     
        const posts = await Post.query()
                .whereIn('user_id', user_ids)
                .select('id', 'image', 'user_id', 'caption', 'created')
                .preload('user', (query) => {
                    query.select('id', 'username', 'avatar')
                })
                .limit(10)

        // return { auth, posts }

        return view.render('welcome', { posts })
    }
}
