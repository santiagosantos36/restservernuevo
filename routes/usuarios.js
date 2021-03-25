
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require ('../models/rol')
const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const {validarCampos} = require ('../middlewares/validascampos')

const router = Router();


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('nombre','el nombre es obligatorio').not().isEmpty(),
    check('password','mas de  letras').isLength({min:6}),
    check('correo','el correo no es valido').isEmail(),
   // check('rol','no es un rol').isIn(['ADMIN_ROLE', 'USER_ROLE']),
   check ('rol').custom(async(rol='')=>{
    const existRol = await Role.findOne({ rol })
    if(!existRol){
        throw new Error(`El rol ${ rol } no esta registrado`)
    }
   }),
    validarCampos   
],usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );





module.exports = router;