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

router.get('/oportunidade/:id/list' ,ReunioesController.op_list); 
router.post('/oportunidade/:id/create', ReunioesController.createReuniaoOportunidade)
router.get('/oportunidades/:idOp/reuniao/:idReuniao', ReunioesController.getReuniaoOportunidade)
router.post('/oportunidades/:idOp/reuniao/:idReuniao/update', ReunioesController.updateReuniaoOportunidade)

/* oportunidadescolaboradores) ---------------------- */
router.get('/oportunidadescolaboradores/list' ,ReunioesController.listreunioesoportunidadescolaboradores);

/* oportunidadescontactos) ---------------------- */
router.get('/oportunidadescontactos/list' ,ReunioesController.listReunioesoportunidadescontactos);

module.exports = router;