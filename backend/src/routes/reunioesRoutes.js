const express = require('express');
const router = express.Router();
//importar os controladores
const ReunioesController = require('../controllers/ReunioesController')

/* ideias ---------------------- */
router.get('/ideias/list' ,ReunioesController.listReunioesideias);

/* colaboradores ---------------------- */
router.get('/colaboradores/list' ,ReunioesController.listReunioesideiascolaboradores);

/* oportunidades ---------------------- */
router.get('/oportunidades/list' ,ReunioesController.listReunioesoportunidades);

/* oportunidadescolaboradores) ---------------------- */
router.get('/oportunidadescolaboradores/list' ,ReunioesController.listreunioesoportunidadescolaboradores);

/* oportunidadescontactos) ---------------------- */
router.get('/oportunidadescontactos/list' ,ReunioesController.listReunioesoportunidadescontactos);

module.exports = router;