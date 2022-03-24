import Usuario from "../models/usuario.js"

   const existeUsuarioById= async (id) => {
        const existe = await Usuario.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeUsuarioNombre= async (nombre) => {
        const existe = await Usuario.findOne({nombre})

        if (existe) {
            throw new Error(`El nombre ya existe  ${nombre}`)
        }
    }




export {existeUsuarioById,existeUsuarioNombre}