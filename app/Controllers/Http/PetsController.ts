import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Pet from 'App/Models/Pet'
import { schema } from '@ioc:Adonis/Core/Validator'
import { Response } from '@adonisjs/core/build/standalone';

export default class PetsController {

    public async index(ctx: HttpContextContract) {
        return Pet.all();
    }

    public async store({ request, response }: HttpContextContract ) {

        const newPetSchema = schema.create({
            name: schema.string({ trim: true }),
            price: schema.number()
        })
        const payload = await request.validate({ schema: newPetSchema });
        const pet = await Pet.create(payload)  // create instance and save in one go
        response.status(201)

        return pet
    }

    public async show({ params }: HttpContextContract ) {
        return Pet.findOrFail(params.id)
    }

    public async update({ params, request }: HttpContextContract ) {

        const body = request.body()
        const pet = await Pet.findOrFail(params.id)
        pet.name = body.name 
        pet.price = body.price 

        return pet.save();
       
    }

    public async destroy({ params, response }: HttpContextContract) {
      
        const pet = await Pet.findOrFail(params.id)
        response.status(204);

        await pet.delete();

        return pet;
    }
}
