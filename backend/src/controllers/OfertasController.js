var Users = require('../model/Users');
var Estadosofertavagas = require('../model/Estadosofertavagas');
var Tiposofertavagas = require('../model/Tiposofertavagas');
var Ofertasvagas = require('../model/Ofertasvagas')

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Ofertasvagas.findAll({
        include: [
            {model: Users},
            {model: Tiposofertavagas},
            {model: Estadosofertavagas}
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
    // data
    const {tipoofertavaga,
        titulo, departamento, localizacao, 
        experiencia_anterior, tempo_minimo_de_experiencia,
        habilitacoes_minimas, renumeracao_base_iliquida,
        descricao, imagem  
    } = req.body;  
    // create
    const now = new Date();
    const data = await Ofertasvagas.create({
        userId: 12,
        estadosofertavagaId: 1,
        tiposofertavagaId: tipoofertavaga,
        titulo: titulo,
        departamento: departamento,
        localizacao: localizacao,
        experiencia_anterior: experiencia_anterior,
        tempo_minimo_de_experiencia: tempo_minimo_de_experiencia,
        habilitacoes_minimas: habilitacoes_minimas,
        renumeracao_base_iliquida: renumeracao_base_iliquida,
        descricao: descricao,
        imagem : imagem,
        data_criacao: now,
        data_atualizacao: now,
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
    const { id } = req.params;
    const data = await Ofertasvagas.findAll({
        where: { id: id },
        include: [
            {model: Users},
            {model: Tiposofertavagas},
            {model: Estadosofertavagas}
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
    const { id } = req.params;
    // parameter POST
    const { estadoofertavaga, tipoofertavaga,
        titulo, departamento, localizacao, 
        experiencia_anterior, tempo_minimo_de_experiencia,
        habilitacoes_minimas, renumeracao_base_iliquida,
        descricao, imagem  
    } = req.body;   
    console.log("---------------------------------------------------------");
    console.log(titulo);
    // Update data
    const now = new Date();
    const data = await Ofertasvagas.update({
        estadosofertavagaId: estadoofertavaga,
        tiposofertavagaId: tipoofertavaga,
        titulo: titulo,
        departamento: departamento,
        localizacao: localizacao,
        experiencia_anterior: experiencia_anterior,
        tempo_minimo_de_experiencia: tempo_minimo_de_experiencia,
        habilitacoes_minimas: habilitacoes_minimas,
        renumeracao_base_iliquida: renumeracao_base_iliquida,
        descricao: descricao,
        imagem : imagem,
        data_atualizacao: now,
    },
    {
        where: { id: id}
    })
    .then( function(data){
        return data;
    })
    .catch(error => {
        return error;
    })
    res.json({success:true, data:data, message:"Updated successful"});
}

/*APAGAR --------------------------------------------------- */
controllers.delete = async (req, res) => {
    // parâmetros por post
    const { id } = req.body;
    // delete por sequelize
    const del = await Ofertasvagas.destroy({
    where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Deleted successful"});
}
module.exports = controllers;