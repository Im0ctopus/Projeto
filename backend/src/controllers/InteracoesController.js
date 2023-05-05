var Users = require('../model/Users');
var Tiposinteracao = require('../model/Tiposinteracao');
var Contactos = require('../model/Contactos');
var Interacoes = require('../model/Interacoes');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Interacoes.findAll({
        include: [
            {model: Users},
            {model: Tiposinteracao},
            {model: Contactos}
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

module.exports = controllers;