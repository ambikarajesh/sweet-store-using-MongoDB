exports.admin = (req, res, next)=>{
    res.render('admin/admin', {
        pageTitle : 'Admin'
    })
}