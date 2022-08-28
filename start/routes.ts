/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Logger from '@ioc:Adonis/Core/Logger'

// Route.get('/', async ({ view }) => {

//   Logger.info('Welcome Learn Tech Tips');
//   Logger.warn('I am  Zidane - 雞蛋🥚🥚🥚🥚🥚🥚🥚🥚🥚🥚');
//   return view.render('welcome')
// })



// Route.get('/json', async ({ params, view }) => {
//   return { 
//     product_id: 1,
//     name: 'This is name',
//     description: 'This is description'
//   }
// })


// Route.get('/string', async ({ params, view }) => {
//   return 'I am a string'
// })

// Route.get('/posts/:postId', async ({ params, request, response }) => {
//   response.status(200)
//   return 'I am a string: ' + params.postId
// })

// ----- controller
// Route.get('/pets', 'PetsController.index');
// Route.post('/pets', 'PetsController.store');

// Route.resource('/pets', 'PetsController.store');

Route.resource('/pets', 'PetsController').apiOnly();



// Route.get('/', ({ request, auth, response, view }) => {

//   // Logger.info(request.url());
//   // Logger.info(request.all());

//   return view.render('welcome')
// })

// Route.get('register', 'AuthController.registerShow').as('auth.register.show')
// Route.post('/register', 'AuthController.register').as('auth.register')
// Route.get('login', 'AuthController.loginShow').as('auth.login.show')
// Route.post('/login', 'AuthController.login').as('auth.login')


// vilh start/kernel.ts - add below auth
// Server.middleware.registerNamed({
//   auth: 'App/Middleware/Auth'
// })


Route.on('/register').render('auth/register')
Route.on('/login').render('auth/login')
Route.on('/profile').render('auth/profile').middleware('auth')
Route.on('/profile/edit').render('profile/edit').middleware('auth')

// https://docs.adonisjs.com/guides/auth/middleware
// The silent auth middleware silently checks if the user is logged-in or not. The request still continues as usual, even when the user is not logged-in.
// This middleware is helpful when you want to render a public webpage, but also show the currently logged in user details somewhere in the page (maybe the header).
// dung middleware('silentAuth')  de co the show login data username on trang homepage, show ten auth khi da login 

Route.on('/introduce').render('introduces/index').middleware('silentAuth')   

// dung middleware('auth') de force user login when chua co thong tin login

Route.get('/:username', 'ProfilesController.index').middleware('auth')
Route.get('/posts/create', 'PostsController.create').middleware('auth');
Route.get('/', 'HomesController.index').middleware('silentAuth')

Route.post('/login', 'AuthController.login') 
Route.post('/register', 'AuthController.register')
Route.post('/logout', 'AuthController.logout') 
Route.post('/profile/update', 'ProfilesController.update').middleware('auth')
Route.post('/posts/store', 'PostsController.store').middleware('auth');
Route.post('/follow/:user_id', 'FollowsController.store').middleware('auth');

Route.delete('/follow/:user_id', 'FollowsController.destroy').middleware('auth')
Route.delete('/posts/:post_id', 'PostsController.destroy').middleware('auth')

// ---- CMS Dashboard ----
Route.on('/cms').render('cms/index')