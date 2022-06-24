import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"

export default class AuthController {
    public async registerShow( { view }: HttpContextContract ) {
        return view.render('auth/register')
    }

    public async loginShow ({ view }: HttpContextContract) {
        return view.render('auth/register')
    }
}