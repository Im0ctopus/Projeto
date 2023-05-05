var Users = require('../model/Users');
var Estadoscandidatura = require('../model/EstadosCandidaturas');
var Ofertavagas = require('../model/Ofertasvagas')
var Candidaturas = require('../model/Candidaturas')

var sequelize = require('../model/database');

const controllers = {}
sequelize.sync()
/* LISTAR ---------------------- */
controllers.list = async (req,res) => {
    const data = await Candidaturas.findAll({
        include: [
            {model: Users},
            {model: Estadoscandidatura},
            {model: Ofertavagas}
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