const express = require('express');
const router = express.Router();
//importar os controladores
const interacoesController = require('../controllers/InteracoesController')

router.get('/list' ,interacoesController.list);

module.exports = router;