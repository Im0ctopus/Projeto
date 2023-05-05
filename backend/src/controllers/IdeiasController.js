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

module.exports = controllers;