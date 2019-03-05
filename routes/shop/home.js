const express = require('express');
const router = express.Router();


const shopController = require('../../controller/shop/home')
router.get('/', shopController.getProducts)

module.exports = router;