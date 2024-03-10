import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import midtransClient from "midtrans-client";
import Config from '@ioc:Adonis/Core/Config'
import Order from 'App/Models/Order';
import crypto from 'crypto';
import { v4 as uuidv4 }from "uuid";
import Cart from 'App/Models/Cart';

export default class OrdersController {
    public async store({request,response}:HttpContextContract){
        const product = request.input('product_id');
        const qty = request.input('qty');
        const store = request.input('store_id');
        const user = request.input('user_id');
        var coba:any[] = [];
        for(var i=0; i<product.length; i++){
            const productarr = product[i]
            const storearr = store[i]
            const qtyarr = qty[i];
            const userarr = user[i]
                var cart = {
                    id:uuidv4(),
                    productId:productarr,
                    qty:qtyarr,
                    storeId:storearr,
                    userId:userarr
                }
                // await Order.create(cart);
                coba.push(cart)
                
            }
            await Order.createMany(coba)
        //return response.redirect("/order")
        return response.json({
            msg:"success"
        })
        // Create Snap API instance
        
    }

    public async index({view,auth}:HttpContextContract){
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : Config.get('midtrans.serverKey')
        });
        const userId:any = auth.user?.id
        const order = await Order.query().preload("product").preload("user").where("user_id",userId).where("status","not");
        const ordersingle = await Order.query().preload("product").preload("user").where("user_id",userId).where("status","not").first();
        let price = 0;
        order.map(o=>{
            price += o.product.price * o.qty
        });
        console.log(price);
        var uuid = ordersingle?.id;
        let parameter = {
            "transaction_details": {
                "order_id": uuid,
                "gross_amount": price
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "username": auth.user?.username,
                "email": auth.user?.email,
            }
        }
        const transaction = await snap.createTransaction(parameter);
        const transactionToken = await transaction.token;
        
        return view.render('order.checkout',{snapToken:transactionToken,order});
    }

    public async callback({request,response}:HttpContextContract){
        const serverKey = await Config.get('midtrans.serverKey');
        const hash = crypto.createHash('sha512').update(request.input('order_id')+request.input('status_code')+request.input('gross_amount')+serverKey,"utf-8").digest('hex')
        if(hash == request.input("signature_key")){
            if(request.input("transaction_status")== 'capture'){
                const callback = await Order.findBy('id',request.input("order_id"));
                const userId : any= callback?.userId;
                await Order.query().where('user_id',userId).update({status:"paid"});
                const orderProduct = await Order.query().where("user_id",userId).where('status','paid');
                orderProduct.map(async (op)=>{
                    const orderqty = op.qty;
                    const cartsProductUser = await Cart.query().where('user_id',userId).where('product_id',op.productId);
                    if(orderqty >= cartsProductUser.length){
                        await Cart.query().where('user_id',userId).where('product_id',op.productId).delete()
                    }else{
                        for (let i = 0; i < orderqty; i++) {
                            cartsProductUser[i].delete();
                        }
                    }
                });
                return response.json({msg:"heheh"})
            }
        }
    }


}
