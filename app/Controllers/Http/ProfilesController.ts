// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 
import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import User from "App/Models/User"
// import { UserFactory } from 'Database/factories'

export default class ProfilesController {
    public async index({ view, params } : HttpContextContract) {
        const username = params.username
       // const user = await User.findBy('username', username).preload('posts)

       // await UserFactory.with('posts', 5).createMany(10)

        const user = await User
            .query()
            .where('username', username)
            .andWhere('enabled', true)
            .preload('posts', (query) => {
                query.where('enabled', 1)
            }).first()  // remember it (if not will return array)

        if (!user) {
            return view.render('errors.not-found')
        }  
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
