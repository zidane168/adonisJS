// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import User from "App/Models/User"
import { UserFactory } from 'Database/factories'

export default class ProfilesController {
    public async index({ view, params } : HttpContextContract) {
        const username = params.username
        const user = await User.findBy('username', username)

        await UserFactory.with('posts', 5).createMany(10)
        
        if (!user) {
            return view.render('errors.not-found')
        }
        await user.preload('posts');

        return view.render('auth/profile', { user })
    }

    public async edit({ view } : HttpContextContract) {
        return view.render('accounts/edit')
    }

    public async update({ request, auth, response } : HttpContextContract) {
        const user = auth.user
        const avatar = request.file('avatar')
        if (!avatar) {
            return 'Please upload file!'
        } 
 
        user.bio = request.input('bio') 

        const imageName  = new Date().getTime().toString() + `.${avatar.extname}`

        await avatar.move(Application.publicPath('images'), {
            name: imageName
        })

        user.avatar = `images/${imageName}`
        await user?.save()
        return response.redirect(`/${user.username}`);
    }
}
