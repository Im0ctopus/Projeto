var Users = require('../model/Users');
var Tiposdeideias = require('../model/Tiposdeideias');
var Ideias = require('../model/Ideias');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Ideias.findAll({
        include: [
            {model: Tiposdeideias},
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
/* REGISTAR ---------------------- */
controllers.create = async (req,res) => {
    // data
    const { tipoideia, titulo, descricao, 
        } = req.body;
    // create
    const data = await Ideias.create({
        tipodeideiaId: tipoideia,
        userId: 5, //ATENÇAO MUDAR
        titulo: titulo,
        descricao: descricao,
    }) 
    .then(function(data){
        console.log(data)
        return data;
    })
    .catch(error =>{
        console.log("Erro: "+error)
        return error;
    })
}

module.exports = controllers;