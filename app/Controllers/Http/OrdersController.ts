import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import midtransClient from "midtrans-client";
import Config from '@ioc:Adonis/Core/Config'
import Order from 'App/Models/Order';
import crypto from 'crypto';
import { v4 as uuidv4 }from "uuid";
import Cart from 'App/Models/Cart';

export default class OrdersController {
    public async store({request,response}:HttpContextContract){
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let random : string = ''
        const charactersLength = characters.length;
        for(let j=0; j<=8; j++){
            random += characters.charAt(Math.floor(Math.random() * charactersLength))
        }
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
                    token:random,
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
        var token = ordersingle?.token;
        let parameter = {
            "transaction_details": {
                "order_id": token,
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
        
        return view.render('order.checkout',{snapToken:transactionToken,order,token});
    }

    public async callback({request,response}:HttpContextContract){
        const serverKey = await Config.get('midtrans.serverKey');
        const hash = crypto.createHash('sha512').update(request.input('order_id')+request.input('status_code')+request.input('gross_amount')+serverKey,"utf-8").digest('hex')
        if(hash == request.input("signature_key")){
            if(request.input("transaction_status")== 'capture'){
                const callback = await Order.findBy('token',request.input("order_id"));
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
                return response.json({msg:"success"})
            }
            if(request.input("transaction_status")== 'pending'){
                const callback = await Order.findBy('token',request.input("order_id"));
                const userId : any= callback?.userId;
                await Order.query().where('user_id',userId).update({status:"pending"});
                return response.json({msg:"pending"})
            }
            if(request.input("transaction_status")== 'cancel'){
                const callback = await Order.findBy('token',request.input("order_id"));
                const userId : any= callback?.userId;
                await Order.query().where('user_id',userId).update({status:"cancel"});
                return response.json({msg:"cancel"})
            }
        }
    }

    public async history({view,auth}:HttpContextContract){
        const unpaid = await Order.query().where('status','not');
        const paids = await Order.query().preload('product').preload('store').where('status','paid');
        const pending = await Order.query().where('status','pending').preload('product').preload('store');
        const cancel = await Order.query().where('status','cancel').preload('product').preload('store');
        const userId:any = auth.user?.id
        const carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id');
        return view.render("order.history",{paids,pending,cancel,unpaid,carts})
    }


}
