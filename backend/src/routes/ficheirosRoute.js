const express = require('express');
const router = express.Router();
//importar os controladores
const FicheirosController = require('../controllers/FicheirosController')

/* entrevistas ---------------------- */
router.get('/entrevistas/list' ,FicheirosController.listFicheirosentrevistas);

/* interacao ---------------------- */
router.get('/interacao/list' ,FicheirosController.listFicheirosinteracao);

/* reuniaoideias ---------------------- */
router.get('/reuniaoideias/list' ,FicheirosController.listFicheirosreuniaoideias);

/* reuniaooportunidades ---------------------- */
router.get('/reuniaooportunidades/list' ,FicheirosController.listFicheirosreuniaooportunidades);

module.exports = router;