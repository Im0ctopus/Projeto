var Users = require('../model/Users');
var Tiposdeperfil = require('../model/Tiposdeperfil');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');

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
controllers.register = async (req,res) => {
    console.log("Estou aqui");
    const { pname, uname, telemovel, email, password, imagem } = req.body;
    console.log("aqui"+ pname);
    const hashedPassword = bcrypt.hashSync(password, 10);
    const data = await Users.create({
        tiposdeperfilId : 4,
        primeiro_nome: pname,
        ultimo_nome: uname,
        telemovel: telemovel,
        email: email,
        password: hashedPassword,
        imagem: imagem,
        cargo: 'visitante',
        estado: 1,
        primeiro_login: 0
    })
    .then(function(data){
        return data;
    })
    .catch(error =>{
        console.log("Erro: "+error);
        return error;
    })
    res.status(200).json({
        success: true,
        message:"Registado",
        data: data
    });
    }
/* LOGIN ---------------------- */
controllers.login = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    if (!email || !password) {
      res.status(403).json({
        success: false,
        message: 'Campos em Branco'
      });
      return;
    }
  
    try {
      
      let user = await Users.findOne({ where: { email: email } });
  
      if (!user) {
        res.status(403).json({
          success: false,
          message: 'Dados de autenticação inválidos.'
        });
        return;
      }
      const isMatch = bcrypt.compareSync(password, user.password);
  
      if (isMatch) {
        console.log('Autenticação realizada com sucesso!');
        let token = jwt.sign(
          { email: email },
          config.jwtSecret,
          { expiresIn: '5min' }
        );
        console.log('Autenticação realizada com sucesso!');
  
        res.json({
          success: true,
          message: 'Autenticação realizada com sucesso!',
          token: token
        });
      } else {
        res.status(403).json({
          success: false,
          message: 'Dados de autenticação inválidos.'
        });
      }
    } catch (error) {
      console.log("Erro: " + error);
      res.status(500).json({
        success: false,
        message: 'Erro no processo de autenticação. Tente novamente mais tarde.'
      });
    }
  };

module.exports = controllers;