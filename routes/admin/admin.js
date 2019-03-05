const express = require('express');

const router = express.Router();

const adminController = require('../../controller/admin/product')
router.get('/add-product', adminController.addProduct);
router.post('/add-product/product', adminController.getProduct)

module.exports = router;