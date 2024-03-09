import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator';
import Comment from 'App/Models/Comment';
export default class CommentsController {
    public async store({request}:HttpContextContract){
        const commentSchema = schema.create({
            userId:schema.number([rules.required()]),
            productId:schema.number([rules.required()]),
            comments:schema.string({trim:true,escape:true})
        })
        const data = await request.validate({schema:commentSchema});
        await Comment.create({
            userId:data.userId,
            productId:data.productId,
            comments:data.comments
        })
    }   
}
