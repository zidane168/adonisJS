import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Following from 'App/Models/Following'


export default class FollowsController {

    public async store({ params, response, auth }: HttpContextContract) {
        const follow = new Following()
        follow.user_id = auth.user.id
        follow.following_id = params.user_id    // param ben routes.ts file // Route.post('/follow/:user_id', 'FollowsController.store').middleware('auth');
        await follow.save()

        return response.redirect().back()
    }

    public async destroy({ params, response, auth }: HttpContextContract) {
        const follow = Following.query().where('user_id', auth.user.id)
            .where('following_id', params.user_id)

        await follow.delete()
        return response.redirect().back()

    }
}
