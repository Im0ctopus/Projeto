var Users = require('../model/Users');
var Tiposdeperfil = require('../model/Tiposdeperfil');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Users.findAll({
        include: [ Tiposdeperfil ]
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