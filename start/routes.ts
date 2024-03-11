import Route from '@ioc:Adonis/Core/Route'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cart from 'App/Models/Cart';
import Category from 'App/Models/Category'
import Product from 'App/Models/Product';

Route.get('/', async ({ view,auth }) => {
  const category = await Category.all();
  const products = await Product.query().preload('store');
  var carts: Cart[]=[];
  if(auth.user){
    const userId:any = auth.user?.id
          //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
    carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id');
  }
  return view.render('welcome',{category,products,carts})
})
Route.group(()=>{
  Route.get('/register','AuthController.regisView')
  Route.get('/login','AuthController.loginView')
}).middleware(['guest'])

Route.group(()=>{
  Route.get('/admin','ProductsController.adminView')
  Route.get('/category','CategoriesController.index')
  Route.post('/category','CategoriesController.store')
  Route.get('/category/:slug','CategoriesController.edit')
  Route.put('/category/:id','CategoriesController.update')
}).middleware(['auth','role:admin'])

Route.post('/register','AuthController.register')
Route.post('/login','AuthController.login')
Route.post('/logout','AuthController.logout');

Route.group(()=>{
  Route.get('/store','StoresController.index').prefix('dashboard')
  Route.get('/store/create','StoresController.create').prefix('dashboard')
  Route.get('/store/:slug/product','ProductsController.index').prefix('dashboard');
  Route.get('/cart','CartsController.index')
  Route.get('/cart/length','CartsController.length')
  Route.get('/store/:slug/product/create','ProductsController.create').prefix('dashboard');
  Route.get('/store/:slug/product/:pslug','ProductsController.detail').prefix('dashboard');
  Route.get('/read/:id','ProductsController.readComment');
  Route.get('/order','OrdersController.index');
  Route.get("/order/history",async({view})=>{
    return view.render('order.history');
  })

  Route.post('/store','StoresController.store')
  Route.post('/product/create','ProductsController.store')
  Route.post('/product/comments','ProductsController.comments')
  Route.post('/product/cart','CartsController.store')
  Route.post('/order','OrdersController.store')

  Route.delete("/cart/delete/:id",'CartsController.destroy')
}).middleware(['auth','role:user'])


Route.post('/api/midtrans-callback','OrdersController.callback');
import Config from '@ioc:Adonis/Core/Config'
import crypto from 'crypto';
import Order from 'App/Models/Order';
import Database from '@ioc:Adonis/Lucid/Database';
Route.post("/api/halo",async({request,response}:HttpContextContract)=>{
        const serverKey = Config.get('midtrans.serverKey');
        const order_id = request.input("order_id"); 
        console.log(order_id);
        console.log(request.input('status_code'));
        const hash = crypto.createHash('sha512').update(request.input('order_id')+request.input('status_code')+request.input('gross_amount')+serverKey,"utf-8").digest('hex');
        console.log(hash);
        const key = request.input("signature_key")
        console.log(key);
        if(hash==key){
          const status = request.input("transaction_status")
            if(status == 'capture'){
                const callback = await Order.findBy('id',request.input("order_id"));
                const userId : any= callback?.userId;
                //await Order.query().where('user_id',userId).update({status:"sudah"});
                await Database.rawQuery(`UPDATE orders SET status='sudah' WHERE user_id = ${userId}`);
                // callback?.merge({
                //     status:"sudah"
                // })
                // await callback?.save();
                return response.json({msg:"berhsil"});
            }

        }else{
          return response.json({msg:"jajaj"})
        }
})


Route.get('/google','SocialsController.google')
Route.get('/google/callback','SocialsController.googleCallback')

Route.get('/password/forgot','PasswordResetsController.forgot')
Route.get('/password/reset/:token','PasswordResetsController.reset')
Route.post('/password/send','PasswordResetsController.send')
Route.post('/password/store','PasswordResetsController.store')