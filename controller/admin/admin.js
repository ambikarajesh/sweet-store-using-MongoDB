var JSAlert = require('js-alert');
const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const config = configs['data'];
const productsModel = new ProductsModel(config.sweets);

exports.addProduct = (req, res, next)=>{
    res.render('admin/add-product', {
        pageTitle : 'Admin',
        path : '/admin/add-product'
    })
}
exports.getProduct = async(req, res, next)=>{
    await productsModel.storeProduct(req.body);
    res.status(302);
    res.redirect('/');
}

exports.getProducts = async(req, res, next)=>{
    const products = await productsModel.fetchProducts();
    res.render('admin/products', {
        pageTitle : 'Admin Products',
        path: '/admin/products',
        products:products
    })
}

exports.deleteProduct = async(req, res, next)=>{
    await productsModel.removeProduct(req.body.productId);
    res.redirect('/admin/products');
}



