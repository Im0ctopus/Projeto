const express = require('express');
const router = express.Router();
//importar os controladores
const userController = require('../controllers/userController')

router.get('/list' ,userController.list);

module.exports = router;