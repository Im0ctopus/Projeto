const express = require('express');
const router = express.Router();
//importar os controladores
const IdeiasController = require('../controllers/IdeiasController')

router.get('/list' ,IdeiasController.list);

module.exports = router;