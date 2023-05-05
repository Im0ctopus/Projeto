const express = require('express');
const router = express.Router();
//importar os controladores
const ContactosController = require('../controllers/ContactosController')

router.get('/list' ,ContactosController.list);

module.exports = router;