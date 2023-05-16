var Users = require('../model/Users');
var Notasentrevistas = require('../model/Notasentrevistas');
var Entrevistas = require('../model/Entrevistas');
var Notasinteracao = require('../model/Notasinteracao');
var Interacoes = require('../model/Interacoes');
var Notasreuniaoideias = require('../model/Notasreuniaoideias');
var Reunioesideias = require('../model/Reunioesideias');
var Notasreuniaooportunidades = require('../model/Notasreuniaooportunidades');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');
var Contactos = require('../model/Contactos')

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* Notasentrevistas ---------------------- */
/* LISTAR ---------------------- */
controllers.listNotasentrevistas = async (req,res) => {
    const data = await Notasentrevistas.findAll({
        include: [ Users ],
        include: [ Entrevistas ]
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

/* Notasinteracao ---------------------- */
    /* LISTAR ---------------------- */
    controllers.listNotasinteracao = async (req,res) => {
        const data = await Notasinteracao.findAll({
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


    /* LISTAR INTERACAO ---------------------- */
    controllers.list_int = async (req,res) => {
        const { idInt, idCont } = req.params;
        const data = await Notasinteracao.findAll({
            include: [
                {model: Users},
                {model: Interacoes, where: {id: idInt}, 
                    include: [
                        {model: Contactos, where:{id: idCont}}
                    ]
                },
                
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
/* Notasreuniaoideias ---------------------- */
/* LISTAR ---------------------- */
controllers.listNotasreuniaoideias = async (req,res) => {
    const data = await Notasreuniaoideias.findAll({
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

/* Notasreuniaooportunidades ---------------------- */
/* LISTAR ---------------------- */
controllers.listNotasreuniaooportunidades = async (req,res) => {
    const data = await Notasreuniaooportunidades.findAll({
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