
const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const productsModel = new ProductsModel(configs.data.sweets);
const CartModel = require('../../models/cartModel');
const cartModel = new CartModel(configs.data.cart);
exports.getIndex= async(req, res, next)=>{
    res.render('shop/home', {
        pageTitle : 'Shop',
        path: '/',
    })
}
exports.getProducts = async(req, res, next)=>{
    const products = await productsModel.fetchProducts();
    res.render('shop/product-list', {
        pageTitle : 'Products',
        path: '/products',
        products:products
    })
}
exports.getProduct = async(req, res, next)=>{
    const product = await productsModel.fetchProduct(req.params.productId);
    res.render('shop/product-detail', {
        pageTitle : 'Products',
        path: '/products',
        product:product
    })
}


exports.getCart = async(req, res, next)=>{
    const cart = await cartModel.fetchCartItems();
    res.render('shop/cart', {
        pageTitle : 'My Cart',
        path: '/cart',
        items: cart.products,
        subTotal:cart.subTotal
    })
}

exports.addProducttoCart = async(req, res, next) =>{
    const products = await productsModel.fetchProducts();
    const product = products.find(product => product.id === req.body.productId);
    const add = await cartModel.addItem(product);
    res.redirect('/cart');
}

exports.deleteCartItem = async(req, res, next) => {
    await cartModel.DeleteItem(req.body.productId);
    res.redirect('/cart')
}
exports.DecreaseCartItem = async(req, res, next) => {
    await cartModel.DecreaseItem(req.body.productId);
    res.redirect('/cart')
}
exports.IncreaseCartItem = async(req, res, next) => {
    await cartModel.IncreaseItem(req.body.productId);
    res.redirect('/cart')
}

exports.getOrders = (req, res, next)=>{
    res.render('shop/orders', {
        pageTitle : 'My Orders',
        path: '/orders'
    })
}
exports.getCheckout = (req, res, next)=>{
    res.render('shop/checkout', {
        pageTitle : 'Checkout',
        path: '/checkout'
    })
}