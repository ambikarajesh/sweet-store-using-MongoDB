const express = require('express');
const router = express.Router();


const shopController = require('../../controller/shop/shop')
router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.addProducttoCart);
router.post('/delete-cart-item', shopController.deleteCartItem);
router.post('/decrease-cart-item', shopController.DecreaseCartItem);
router.post('/increase-cart-item', shopController.IncreaseCartItem);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);


module.exports = router;