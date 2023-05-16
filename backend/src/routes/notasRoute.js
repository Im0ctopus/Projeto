const express = require('express');
const router = express.Router();
//importar os controladores
const NotasController = require('../controllers/NotasController')

/* Notasentrevistas ---------------------- */
router.get('/entrevistas/list' ,NotasController.listNotasentrevistas);

/* Notasinteracao ---------------------- */
router.get('/interacoes/list' ,NotasController.listNotasinteracao);
router.get('/interacoes/:idInt/contactos/:idCont/list' ,NotasController.list_int);

/* Notasreuniaoideias ---------------------- */
router.get('/reuniaoideias/list' ,NotasController.listNotasreuniaoideias);

/* Notasreuniaooportunidades ---------------------- */
router.get('/reuniaooportunidades/list' ,NotasController.listNotasreuniaooportunidades);

module.exports = router;