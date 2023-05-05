var Users = require('../model/Users');
var Ficheirosentrevistas = require('../model/Ficheirosentrevistas');
var Entrevistas = require('../model/Entrevistas');
var Ficheirosinteracao = require('../model/Ficheirosinteracao');
var Interacoes = require('../model/Interacoes');
var Ficheirosreuniaoideias = require('../model/Ficheirosreuniaoideias');
var Reunioesideias = require('../model/Reunioesideias');
var Ficheirosreuniaooportunidades = require('../model/Ficheirosreuniaooportunidades');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* Ficheirosentrevistas ---------------------- */
/* LISTAR ---------------------- */
controllers.listFicheirosentrevistas = async (req,res) => {
    const data = await Ficheirosentrevistas.findAll({
        include: [
            {model: Users},
            {model: Entrevistas}
        ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}
/* REGISTAR ---------------------- */

/* Ficheirosinteracao ---------------------- */
/* LISTAR ---------------------- */
controllers.listFicheirosinteracao = async (req,res) => {
    const data = await Ficheirosinteracao.findAll({
        include: [
            {model: Users},
            {model: Interacoes}
        ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Ficheirosreuniaoideias ---------------------- */
/* LISTAR ---------------------- */
controllers.listFicheirosreuniaoideias = async (req,res) => {
    const data = await Ficheirosreuniaoideias.findAll({
        include: [
            {model: Users},
            {model: Reunioesideias}
        ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

/* Ficheirosreuniaooportunidades ---------------------- */
/* LISTAR ---------------------- */
controllers.listFicheirosreuniaooportunidades = async (req,res) => {
    const data = await Ficheirosreuniaooportunidades.findAll({
        include: [
            {model: Users},
            {model: Reunioesoportunidades}
        ]
    })
    .then(function(data){
        return data;
    })
    .catch(error => {
        return error;
    });
    res.json({success : true, data : data});
}

module.exports = controllers;