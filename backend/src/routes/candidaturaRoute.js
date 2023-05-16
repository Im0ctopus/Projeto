const express = require('express');
const router = express.Router();
//importar os controladores
const CandidaturaController = require('../controllers/CandidaturasController')

router.get('/list' ,CandidaturaController.list);

module.exports = router;