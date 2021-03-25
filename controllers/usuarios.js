const { response, request } = require('express');
const bcrypt = require ('bcryptjs');

const Usuario = require('../models/usuario');



const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = async (req, res = response) => {
    
   
    const {nombre,correo,password,rol} =  req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if ( existeEmail ){
        return res.status(400).json({
                msg: 'el correo esta registrado'

        })
    }

    //encriptar la contra
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);
    //guardar BD
    await usuario.save();
    
    res.json({
        
        usuario
    });
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}