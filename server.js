const express = require('express');
const path = require('path');
const shopRouter = require('./routes/shop/home');
const adminRouter = require('./routes/admin/admin')
const errorController = require('./controller/error')

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', shopRouter)
app.use('/admin', adminRouter)
app.use(errorController.error404)

app.listen(PORT, ()=>{
    console.log(   `Server Start in port ${PORT}`);
})