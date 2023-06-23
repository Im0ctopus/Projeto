var Users = require('../model/Users');
var Candidaturas = require('../model/Candidaturas');
var Estadosentrevistas = require('../model/Estadosentrevistas');
var Entrevistas = require('../model/Entrevistas');
var Ofertasvagas = require('../model/Ofertasvagas')

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Entrevistas.findAll({
        include: [
            { model: Users, as: 'user' },
            {model: Candidaturas},
            {model: Estadosentrevistas}
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

/* LISTAR CANDIDATURA---------------------- */
controllers.list_cand = async (req,res) => {
    const { idOferta, idCand } = req.params;

    const data = await Entrevistas.findAll({
        include: [
            // { model: Users, as: 'user' }, 
            { model: Users, as: 'user' },
            {
                model: Users, as: 'entrevistador', 
            },
            {   
                model: Candidaturas, 
                where:{id:idCand}, 
                include:[
                    {model: Ofertasvagas, where:{id:idOferta}}
                ]
            },
            {model: Estadosentrevistas} 
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
controllers.create = async (req,res) => {
    const { idCand, idOferta } = req.params;
    // data
    const {detalhes,entrevistador,data_entrevista, user 
    } = req.body;  
    // create
    const data = await Entrevistas.create({
        detalhes : detalhes,
        entrevistadorId : entrevistador,
        data_entrevista: data_entrevista,
        candidaturaId : idCand, 
        userId : user,
        estadosentrevistaId: 1,
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
controllers.get = async (req,res) => {
    const { idEntre, idCand, idOferta } = req.params;

    const data = await Entrevistas.findOne({
        where: { id: idEntre },
        include: [
            {
                model: Candidaturas, where: { id: idCand }, 
                include: [
                    {model: Ofertasvagas, where: {id: idOferta}}
                ]

            },

            { model: Users, as: 'user' },
            {
                model: Users, as: 'entrevistador', 
            },
            { model: Estadosentrevistas},
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
controllers.update = async (req,res) => {
    // parameter get id
    const { idEntre, idCand, idOferta } = req.params;
    // parameter POST
    const { entrevistador, detalhes, classificacao, data_entrevista, estado } = req.body;


    // Update data
    const data = await Entrevistas.update({
        entrevistadorId: entrevistador,
        classificacao: classificacao,
        estadosentrevistaId: estado,
        data_entrevista: data_entrevista,
        detalhes: detalhes,
    },
    {
        where: { id: idEntre}
    })
    .then( function(data){
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Updated successful"});
}


/* LISTAR USER---------------------- */
controllers.colaborador_list = async (req,res) => {
    const { idUser } = req.params;
    const data = await Entrevistas.findAll({
        include: [
            { 
                model: Users, as: 'entrevistador', where:{id: idUser} 
            },
            {
                model: Candidaturas,
                include: [
                    {model: Users}
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
module.exports = controllers;