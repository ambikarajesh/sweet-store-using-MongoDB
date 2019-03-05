const configs = require("../../config")
const ProductsModel = require('../../models/productsModel');
const config = configs['data'];
const productsModel = new ProductsModel(config.sweets);
exports.addProduct = (req, res, next)=>{
    res.render('addProduct', {
        pageTitle : 'Admin',
        path : '/admin/add-product'
    })
}
exports.getProduct = async(req, res, next)=>{
    await productsModel.storeProduct(req.body);
    res.status(302);
    res.redirect('/');
}




