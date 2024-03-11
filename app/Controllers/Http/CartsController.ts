import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema,rules} from '@ioc:Adonis/Core/Validator'
import Cart from 'App/Models/Cart';
export default class CartsController {
    public async index({view,auth}:HttpContextContract){
        const userId:any = auth.user?.id
        //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
        const carts = await Cart.query().select('store_id','product_id','user_id').count('product_id as cart_groups').preload("store").preload('user').preload('product',(category)=>{category.preload('category')}).where('user_id',userId).groupBy('product_id').groupBy('store_id');
        //const carte = Cart.$addColumn('cart_groups',{columnName:'cart_groups'})
        return view.render('cart.index',{carts});
    }
    public async store({request,response,auth}:HttpContextContract){
        
        if(auth.user){
                const cartSchema = schema.create({
                    productId:schema.number([rules.trim(),rules.escape()]),
                    storeId:schema.number([rules.trim(),rules.escape()]),
                    userId:schema.number([rules.trim(),rules.escape()])
                })
                const data = await request.validate({schema:cartSchema});
                await Cart.create(data);
                const userId:any = auth.user?.id
                //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
                const carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id').groupBy('store_id');
                const carlen = carts.length;
                return response.json({count:carlen});
        }
        
        
    }
    public async length({response,auth}:HttpContextContract){
        if(auth.user){
            const userId:any = auth.user?.id
            //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
            const carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id').groupBy('store_id');
            const carlen = await carts.length;
            return response.json({count:carlen});
        }
    }

    public async destroy({params,response,auth}:HttpContextContract){
        const productId = params.id
        const cart = Cart.query().where('product_id',productId);
        await cart.delete();
        const userId:any = auth.user?.id
          //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
        const carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id');
        const counts = carts.length
        return response.json({count:counts})
    }
}
