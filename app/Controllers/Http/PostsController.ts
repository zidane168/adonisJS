import Post from "App/Models/Post" 
import { HttpContextContract  } from "@ioc:Adonis/Core/HttpContext"

export default class PostsController {

    public async create({ view } : HttpContextContract) {
        return view.render('posts/create')
    }
}
