

const { Schema, model } = require ('mongoose')
const UsuarioSchema = Schema ({

    nombre: {
        type: String,
        require: (true, 'El nombre es obligatorio')

    },
    correo: {
        type: String,
        require: (true, 'El correo es obligatorio'),
        unique: true

    },
    password : {
        type: String,
        require : (true, 'la contraseña es obligatoria')
    },

    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', ' USER_ROLE']
    },

    estado : {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false

    }

});

module.exports =model('Usuarios', UsuarioSchema);