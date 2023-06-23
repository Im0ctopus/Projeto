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
const { where } = require('sequelize');

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

    /* LISTAR IDEIA---------------------- */
    controllers.ideia_list = async (req,res) => {
        const { id } = req.params;
        const data = await Reunioesideias.findAll({
            include: [
                {model: Ideias, where:{id:id}},
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

    /* LISTAR REUNIAO---------------------- */
    controllers.listreuniaosoportunidadescolaboradores = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await reunioesoportunidadescolaboradores.findAll({
            include: [
                {model: Users},
                {model: Reunioesoportunidades, where: {id: idReuniao},
                    include: [
                        {model: Oportunidades, where:{id: idOp}}
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


    /* LISTAR USER---------------------- */
    controllers.listreunioesoportunidadescolaborador = async (req,res) => {
        const { idUser } = req.params;
        const data = await reunioesoportunidadescolaboradores.findAll({
            include: [
                {model: Reunioesoportunidades},
                {model: Users, where:{id: idUser}}
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
    controllers.addreuniaosoportunidadescolaboradores = async (req, res) => {
        // data
        const { idReuniao } = req.params;
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(req.body);
      
        const {adicionar , remover } = req.body

        const promises = []; 
        
        adicionar.forEach(async (item) => {
            const existingEntry = await reunioesoportunidadescolaboradores.findOne({
                where: {
                    reunioesoportunidadeId: idReuniao,
                    userId: item,
                },
            });
            if(!existingEntry)
            {
                const data = await reunioesoportunidadescolaboradores.create({
                    reunioesoportunidadeId: idReuniao,
                    userId: item,
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });
                promises.push(data);
            }
        });

        remover.forEach(async (item) => {
            // const existingEntry = await reunioesoportunidadescolaboradores.findOne({
                // where: {
                //   reunioesoportunidadeId: idReuniao,
                //   userId: item,
                // },
            // });
            // if(!existingEntry)
            {
                const data = await reunioesoportunidadescolaboradores.destroy({
                    where:{ 
                            reunioesoportunidadeId: idReuniao,
                            userId: item,
                        }
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });
                promises.push(data);
            }
        });
        
      
        await Promise.all(promises);
      
        res.json({ success: true, message: "Created successfully" });
    };

/* reunioesoportunidadescontactos ---------------------- */
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

    /* LISTAR REUNIAO---------------------- */
    controllers.listReuniaosoportunidadescontactos = async (req,res) => {
        const { idOp, idReuniao } = req.params;
        const data = await Reunioesoportunidadescontactos.findAll({
            include: [
                {model: Contactos},
                {model: Reunioesoportunidades, where: {id: idReuniao},
                    include: [
                        {model: Oportunidades, where:{id: idOp}}
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

    /* REGISTAR ---------------------- */
    controllers.addReuniaosoportunidadescontactos = async (req, res) => {
        // data
        const { idReuniao } = req.params;
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        console.log(req.body);
      
        const {adicionar , remover } = req.body

        const promises = []; 
        
        adicionar.forEach(async (item) => {
            const existingEntry = await Reunioesoportunidadescontactos.findOne({
                where: {
                  reunioesoportunidadeId: idReuniao,
                  contactoId: item,
                },
            });
            if(!existingEntry)
            {
                const data = await Reunioesoportunidadescontactos.create({
                    reunioesoportunidadeId: idReuniao,
                    contactoId: item,
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });
                promises.push(data);
            }
        });

        remover.forEach(async (item) => {
            // const existingEntry = await Reunioesoportunidadescontactos.findOne({
                // where: {
                //   reunioesoportunidadeId: idReuniao,
                //   contactoId: item,
                // },
            // });
            // if(!existingEntry)
            {
                const data = await Reunioesoportunidadescontactos.destroy({
                    where:{ 
                            reunioesoportunidadeId: idReuniao,
                            contactoId: item,
                        }
                })
                .then(function (data) {
                    return data;
                })
                .catch((error) => {
                    return error;
                });
                promises.push(data);
            }
        });
        
      
        await Promise.all(promises);
      
        res.json({ success: true, message: "Created successfully" });
    };
      
module.exports = controllers;