const express = require('express');

const shopRouter = require('./routes/shop');
const adminRouter = require('./routes/admin')
const errorController = require('./controller/error')
const PORT = 3000;
const app = express();

app.use('/', shopRouter)

app.use('/admin', adminRouter)
app.use(errorController.error404)

app.listen(PORT, ()=>{
    console.log(   `Server Start in port ${PORT}`);
})