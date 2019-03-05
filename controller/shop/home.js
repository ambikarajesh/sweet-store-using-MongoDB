
const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const config = configs['data'];
const productsModel = new ProductsModel(config.sweets);

exports.getProducts = async(req, res, next)=>{
    const products = await productsModel.fetchProducts();
    res.render('home', {
        pageTitle : 'Shop',
        path: '/',
        products:products
    })
}