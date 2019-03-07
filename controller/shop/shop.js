
const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const config = configs['data'];
const productsModel = new ProductsModel(config.sweets);

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
exports.getCart = async(req, res, next)=>{
    res.render('shop/cart', {
        pageTitle : 'My Cart',
        path: '/cart'
    })
}
exports.getOrders = async(req, res, next)=>{
    res.render('shop/orders', {
        pageTitle : 'My Orders',
        path: '/orders'
    })
}
exports.getCheckout = async(req, res, next)=>{
    res.render('shop/checkout', {
        pageTitle : 'Checkout',
        path: '/checkout'
    })
}