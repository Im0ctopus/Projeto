const express = require('express');
const router = express.Router();
//importar os controladores
const tiposController = require('../controllers/tiposController')

/* Tiposdeperfil ---------------------- */
router.get('/perfil/list' ,tiposController.listperfil);

/* beneficios ---------------------- */
router.get('/beneficios/list' ,tiposController.listTiposbeneficios);

/* ideias ---------------------- */
router.get('/ideias/list' ,tiposController.listTiposdeideias);

/* projetos ---------------------- */
router.get('/projetos/list' ,tiposController.listTiposdeprojetos);

/* interacao ---------------------- */
router.get('/interacao/list' ,tiposController.listTiposdeinteracao);

/* ofertas ---------------------- */
router.get('/ofertas/list' ,tiposController.listTiposofertas);

module.exports = router;