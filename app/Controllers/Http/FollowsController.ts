import { HttpContentContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'


export default class FollowsController {

    public async store({ params, response, auth }: HttpContentContract) {
        const follow = new Following()
        follow.user_id = auth.user.id
        follow.following_id = params.user_id    // param ben routes.ts file // Route.post('/follow/:user_id', 'FollowsController.store').middleware('auth');
        await follow.save()

        return response.redirect().back()
    }
}
