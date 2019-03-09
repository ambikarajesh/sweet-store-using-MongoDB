var JSAlert = require('js-alert');
const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const config = configs['data'];
const productsModel = new ProductsModel(config.sweets);

exports.addProduct = (req, res, next)=>{
    res.render('admin/edit-product', {
        pageTitle : 'Admin',
        path : '/admin/add-product',
        edit:false
    })
}
exports.getProduct = async(req, res, next)=>{
    await productsModel.storeProduct(req.body);
    res.status(302);
    res.redirect('/admin/products');
}

exports.editProduct = async (req, res, next)=>{
    const product = await productsModel.findProduct(req.params.productId);
    res.render('admin/edit-product', {
        pageTitle : 'Admin',
        path : '/admin/add-product',
        edit:req.query.edit,
        product:product
    })
}
exports.postEditProduct = async (req,res,next) =>{
    await productsModel.storeProduct(req.body);
    res.redirect('/admin/products')
}
exports.getProducts = async(req, res, next)=>{
    const products = await productsModel.fetchProducts();
     console.log(products)
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



