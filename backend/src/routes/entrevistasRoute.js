const express = require('express');
const router = express.Router();
//importar os controladores
const EntrevistasController = require('../controllers/EntrevistasController')

router.get('/list' ,EntrevistasController.list);

module.exports = router;