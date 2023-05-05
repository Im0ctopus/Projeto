var Users = require('../model/Users');
var Reunioesideias = require('../model/Reunioesideias');
var Ideias = require('../model/Ideias');
var Estadoreuniao = require('../model/Estadosreuniao');
var Reunioesideiascolaboradores = require('../model/Reunioesideiascolaboradores');
var Reunioesoportunidades = require('../model/Reunioesoportunidades');
var Oportunidades = require('../model/Oportunidades');
var reunioesoportunidadescolaboradores = require('../model/Reunioesoportunidadescolaboradores');
var Contactos = require('../model/Contactos');
var Reunioesoportunidadescontactos = require('../model/Reunioesoportunidadescontactos')


var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* Reunioesideias ---------------------- */
/* LISTAR ---------------------- */
controllers.listReunioesideias = async (req,res) => {
    const data = await Reunioesideias.findAll({
        include: [
            {model: Ideias},
            {model: Users},
            {model: Estadoreuniao}
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

/* Reunioesideiascolaboradores ---------------------- */
/* LISTAR ---------------------- */
controllers.listReunioesideiascolaboradores = async (req,res) => {
    const data = await Reunioesideiascolaboradores.findAll({
        include: [
            {model: Reunioesideias},
            {model: Users}
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

/* Reunioesoportunidades ---------------------- */
/* LISTAR ---------------------- */
controllers.listReunioesoportunidades = async (req,res) => {
    const data = await Reunioesoportunidades.findAll({
        include: [
            {model: Oportunidades},
            {model: Users},
            {model: Estadoreuniao}
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

/* reunioesoportunidadescolaboradores ---------------------- */
/* LISTAR ---------------------- */
controllers.listreunioesoportunidadescolaboradores = async (req,res) => {
    const data = await reunioesoportunidadescolaboradores.findAll({
        include: [
            {model: Reunioesoportunidades},
            {model: Users}
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

/* reunioesoportuReunioesoportunidadescontactosnidadescolaboradores ---------------------- */
/* LISTAR ---------------------- */
controllers.listReunioesoportunidadescontactos = async (req,res) => {
    const data = await Reunioesoportunidadescontactos.findAll({
        include: [
            {model: Contactos},
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