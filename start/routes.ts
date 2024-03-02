import Route from '@ioc:Adonis/Core/Route'
import Cart from 'App/Models/Cart';
import Category from 'App/Models/Category'
import Product from 'App/Models/Product';

Route.get('/', async ({ view,auth }) => {
  const category = await Category.all();
  const products = await Product.query().preload('store');
  var carts = [];
  if(auth.user){
    const userId:any = auth.user?.id
          //SELECT `product_id`,`user_id`, COUNT(`product_id`) AS `cart_groups` FROM `carts` WHERE `user_id`=2 GROUP BY `product_id`
    var carts = await Cart.query().select('product_id','user_id').count('product_id as cart_groups').preload('user').preload('product').where('user_id',userId).groupBy('product_id');
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

  Route.post('/store','StoresController.store')
  Route.post('/product/create','ProductsController.store')
  Route.post('/product/comments','ProductsController.comments')
  Route.post('/product/cart','CartsController.store')
}).middleware(['auth','role:user'])



Route.get('/google','SocialsController.google')
Route.get('/google/callback','SocialsController.googleCallback')

Route.get('/password/forgot','PasswordResetsController.forgot')
Route.get('/password/reset/:token','PasswordResetsController.reset')
Route.post('/password/send','PasswordResetsController.send')
Route.post('/password/store','PasswordResetsController.store')