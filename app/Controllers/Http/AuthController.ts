import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import User from "App/Models/User"

export default class AuthController {

    public async registerShow( { view }: HttpContextContract ) {
        console.log('registerShow')
        return view.render('auth/register')
    }

    public async register( {request, response, auth, session }: HttpContextContract) {
        // console.log(request.requestData)    // show all data
        console.log(' register ')
        const userData = request.only(['username', 'email', 'password'])
        const userSchema = schema.create({
            username: schema.string({trim: true}, [ rules.unique( {table: 'users', column: 'username', caseInsensitive: true } )] ),
            email: schema.string({trim: true}, [ rules.email(), rules.unique( {table: 'users', column: 'email', caseInsensitive: true } )] ),
            password: schema.string({trim: true}, [ rules.minLength( 8 )] )
        })

        const user = await User.create(userData)
        await auth.login(user);
        return response.route('welcome')

        // return response.redirect('back');

        // const userSchema = schema.create({
        //     username: schema.string({trim: true}, [ rules.unique( {table: 'users', column: 'username', caseInsensitive: true } )] ),
        //     email: schema.string({trim: true}, [ rules.email(), rules.unique( {table: 'users', column: 'email', caseInsensitive: true } )] ),
        //     password: schema.string({trim: true}, [ rules.minLength( 8 )] )
        // })

        // const data = await request.validate( {schema: userSchema} )
        // const user = await User.create(data);

        // const trx = Database.beginTransaction();
        // await trx.insert({username: 'v'})

        // await auth.login(user);
    }

    public async loginShow ({ view }: HttpContextContract) {
        return view.render('auth/login')
    }

    public async login({request, response, auth, session}: HttpContextContract) {
        const { username, password } = request.all();

        try {
            // await auth.remember(!!remember).attempt(email, password)
            await auth.attempt(username, password)
            return response.redirect('/')

        } catch (error) {
            // session.flash('form', 'Your username or email is incorrect')
            session.flash({
                notification: {
                    type: 'danger',
                    message: `Your username or email is incorrect`
                }
            })
            return response.redirect().back()   // dung yen tai trang nay
        }
    }

    public async logout ({ auth, response } : HttpContextContract) {
        await auth.logout()

        return response.route('welcome')
    }
}