const express = require('express');
const router = express.Router();
//importar os controladores
const OfertasController = require('../controllers/OfertasController')

router.get('/list', OfertasController.list);
router.post('/create' ,OfertasController.create);
router.get('/get/:id', OfertasController.get);
router.post('/update/:id', OfertasController.update);
router.post('/delete', OfertasController.delete);

module.exports = router;