const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const shopRouter = require('./routes/shop/home');
const adminRouter = require('./routes/admin/admin')
const errorController = require('./controller/error')

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({extended:true}));
//app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', shopRouter)
app.use('/admin', adminRouter)
app.use(errorController.error404)

app.listen(PORT, ()=>{
    console.log(   `Server Start in port ${PORT}`);
})