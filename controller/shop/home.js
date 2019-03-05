exports.shop = (req, res, next)=>{
    res.render('home', {
        pageTitle : 'Shop',
        path: '/'
    })
}