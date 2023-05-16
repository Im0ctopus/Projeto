var Users = require('../model/Users');
var Candidaturas = require('../model/Candidaturas');
var Estadosentrevistas = require('../model/Estadosentrevistas');
var Entrevistas = require('../model/Entrevistas');

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Entrevistas.findAll({
        include: [
            {model: Users},
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
/* REGISTAR ---------------------- */

module.exports = controllers;