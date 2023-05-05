const express = require('express');
const router = express.Router();
//importar os controladores
const NotasController = require('../controllers/NotasController')

/* Notasentrevistas ---------------------- */
router.get('/entrevistas/list' ,NotasController.listNotasentrevistas);

/* Notasinteracao ---------------------- */
router.get('/interacao/list' ,NotasController.listNotasinteracao);

/* Notasreuniaoideias ---------------------- */
router.get('/reuniaoideias/list' ,NotasController.listNotasreuniaoideias);

/* Notasreuniaooportunidades ---------------------- */
router.get('/reuniaooportunidades/list' ,NotasController.listNotasreuniaooportunidades);

module.exports = router;