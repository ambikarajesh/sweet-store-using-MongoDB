const express = require('express');

const router = express.Router();

const adminController = require('../../controller/admin/admin')
router.get('/', adminController.admin)

module.exports = router;