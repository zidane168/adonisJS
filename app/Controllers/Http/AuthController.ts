import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import User from "App/Models/User"

export default class AuthController {
    public async registerShow( { view }: HttpContextContract ) {
        return view.render('auth/register')
    }

    public async register( {request, response, auth }: HttpContextContract) {
        // console.log(request.requestData)    // show all data
        console.log(' -------- ')

        const userSchema = schema.create({
            username: schema.string({trim: true}, [ rules.unique( {table: 'users', column: 'username', caseInsensitive: true } )] ),
            email: schema.string({trim: true}, [ rules.email(), rules.unique( {table: 'users', column: 'email', caseInsensitive: true } )] ),
            password: schema.string({trim: true}, [ rules.minLength( 8 )] )
        })

        const data = await request.validate( {schema: userSchema} )
        const user = await User.create(data);

        

        console.log(data)
        // await auth.login(user)

        await auth.login(user);

        return response.redirect('/')
    }

    public async loginShow ({ view }: HttpContextContract) {
        return view.render('auth/register')
    }

    public async login({request, response, auth, session}: HttpContextContract) {
        const { uid, password } = request.only(['uid', 'password']) 

        try {
            await auth.attempt(uid, password)
        } catch (error) {
            session.flash('form', 'Your username or email is incorrect')
              return response.redirect().back()
        }
       
        return response.redirect('/')

    }
}