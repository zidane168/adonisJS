import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"
import { schema, rules } from "@ioc:Adonis/Core/Validator"
import User from "App/Models/User"

export default class AuthController {


    // public async registerShow( { view }: HttpContextContract ) {
    //     console.log('registerShow')
    //     return view.render('auth/register')
    // }

    // public async register( {request, response, auth, session }: HttpContextContract) {
    //     // console.log(request.requestData)    // show all data
    //     console.log(' register ')
    //     const userData = request.only(['username', 'email', 'password'])
    //     const userSchema = schema.create({
    //         username: schema.string({trim: true}, [ rules.unique( {table: 'users', column: 'username', caseInsensitive: true } )] ),
    //         email: schema.string({trim: true}, [ rules.email(), rules.unique( {table: 'users', column: 'email', caseInsensitive: true } )] ),
    //         password: schema.string({trim: true}, [ rules.minLength( 8 )] )
    //     })

    //     const user = await User.create(userData)
    //     await auth.login(user);
    //     return response.route('welcome')

    //     // return response.redirect('back');

    //     // const userSchema = schema.create({
    //     //     username: schema.string({trim: true}, [ rules.unique( {table: 'users', column: 'username', caseInsensitive: true } )] ),
    //     //     email: schema.string({trim: true}, [ rules.email(), rules.unique( {table: 'users', column: 'email', caseInsensitive: true } )] ),
    //     //     password: schema.string({trim: true}, [ rules.minLength( 8 )] )
    //     // })

    //     // const data = await request.validate( {schema: userSchema} )
    //     // const user = await User.create(data);

    //     // const trx = Database.beginTransaction();
    //     // await trx.insert({username: 'v'})

    //     // await auth.login(user);
    // }

    // public async loginShow ({ view }: HttpContextContract) {
    //     return view.render('auth/login')
    // }

    // public async login({request, response, auth, session}: HttpContextContract) {
    //     // const req = await request.validate({
    //     //     schema: schema.create({
    //     //         email: schema.string({}, {
    //     //             rules.email()
    //     //         }),
    //     //         password: schema.string({}, [
    //     //             rules.minLength(8)
    //     //         ])
    //     //     }),
    //     //     messages: {
    //     //         'email.required': 'Email field is required',
    //     //         'password.required': 'Password field is required',
    //     //         'password.minLength': 'Password field must be at least 8 characters'
    //     //     }
    //     // })

    //     // const user = 

    //     // const { username, password } = request.all();

    //     // try {
    //     //     // await auth.remember(!!remember).attempt(email, password)
    //     //     let token = await auth.attempt(username, password)
    //     //     let user = auth.user

    //     //     console.log(token)
    //     //     console.log(user)

    //     //     session.flash({
    //     //         notification: {
    //     //             type: 'success',
    //     //             message: 'Welcome: ' + token + ' ' + user + ' Login succeed!!!'
    //     //         }
    //     //     })
    //     //     return response.redirect('/')

    //     // } catch (error) { 
    //     //     session.flash({
    //     //         notification: {
    //     //             type: 'danger',
    //     //             message: `Your username or email is incorrect`
    //     //         }
    //     //     })
    //     //     return response.redirect().back()   // dung yen tai trang nay
    //     // }
    // }

    public async logout ({ auth, response } : HttpContextContract) {
        await auth.logout()

        return response.route('welcome')
    }


    public async register({ request, response, session } : HttpContextContract) {
  
        // return request
        // return request.all()    // data

        const req = await request.validate({
            schema: schema.create({ 
                username: schema.string({}, []),
                email: schema.string({}, [
                    rules.email(),
                    rules.unique({ table: 'users', column: 'email' })
                ]),
                password: schema.string({}, [ 
                    rules.minLength(6), 
                ]),  
            }),
            messages: {
                'username.required': 'Username field is required',
                'email.required': 'Email field is required',
                'password.required': 'Password field is required',
                'password.minLength': 'Password field must be at least 8 characters'
            }
        })

        const user = new User()
        user.username = req.username
        user.email = req.email 
        user.password = req.password
        await user.save()

        // console.log(req)
        // return request.all();
        
        session.flash({
            notification: {
                type: 'success',
                message: req.username + ' register successfully!!!'
            }
        })
 
        return response.redirect('/')
    }

    public async login({request, response, session, auth}: HttpContextContract) {
        try {
            const req = await request.validate({
                schema: schema.create({  
                    username: schema.string(),
                    password: schema.string({}, [
                        rules.minLength(6)
                    ]) 
                }),
                messages: { 
                    'username.required': 'Username field is required',
                    'password.required': 'Password field is required',
                    'password.minLength': 'Password field must be at least 8 characters'
                }
            })

            await auth.attempt(req.username, req.password)
            session.flash({
                notification: {
                    type: 'success',
                    message: 'Hello: ' + req.username + ', welcome back!'
                }
            })
            // const user = await User.findByOrFail('username', req.username)
            // return user;

            return response.redirect('/')

        } catch (error) { 
            session.flash({
                notification: {
                    type: 'danger',
                    message: `Your username or email is incorrect`
                }
            })
            return response.redirect().back()   // standing on this page
        }
    }
}

//  node ace invoke @adonisjs/auth