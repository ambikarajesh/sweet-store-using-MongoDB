exports.addProduct = (req, res, next)=>{
    res.render('addProduct', {
        pageTitle : 'Admin',
        path : '/admin/add-product'
    })
}
exports.getProduct = (req, res, next)=>{
    console.log(req.body);
    res.status(302);
    res.redirect('/');
}

