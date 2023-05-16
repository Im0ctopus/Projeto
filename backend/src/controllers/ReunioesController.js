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
    /*LISTAR OPORTUNIDADE---------------------- */
    controllers.op_list = async (req,res) => {
        const { id } = req.params;
        const data = await Reunioesoportunidades.findAll({
            include: [{
                model: Oportunidades,
                where: { id: id }
                },
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
    controllers.createReuniaoOportunidade = async (req,res) => {
        const { id } = req.params;
        // data
        const {titulo, detalhes, data_reuniao
                } = req.body;  
        // create
        const data = await Reunioesoportunidades.create({
            oportunidadeId : id,
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: data_reuniao,
            userId: 4,
            estadosreuniaoId : 1,
        }) 
        .then(function(data){
            console.log(data)
            return data;
        })
        .catch(error =>{
            console.log("Erro: "+error)
            return error;
        })
        res.json({success:true, data:data, message:"Created successful"});
    }

    /* BUSCAR ----------------------------------------------- */
    controllers.getReuniaoOportunidade = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await Reunioesoportunidades.findAll({
            where: { id: idReuniao },
            include: [{
                    model: Oportunidades,
                    where: { id: idOp }
                },
                {model: Users},
                {model: Estadoreuniao}
            ]
        })
        .then(function(data){
            return data; 
        })
        .catch(error =>{
            return error;
        })
        res.json({ success: true, data: data });
    }
 

    /* EDITAR --------------------------------------------------- */
    controllers.updateReuniaoOportunidade = async (req,res) => {
        // parameter get id
        const { idOp, idReuniao } = req.params;
        // parameter POST
        const {titulo, detalhes, data_reuniao, estado
            } = req.body;   
        // Update data
        const data = await Reunioesoportunidades.update({
            titulo : titulo,
            detalhes: detalhes,
            data_reuniao: data_reuniao,
            estadosreuniaoId : estado,
        },
        {
            where: { id: idReuniao}
        })
        .then( function(data){
            return data;
        })
        .catch(error => {
            return error;
        })
        res.json({success:true, data:data, message:"Updated successful"});
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