import Cliente from "../models/cliente.js"

   const existeClienteById= async (id) => {
        const existe = await Cliente.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeClienteNombre= async (nombre) => {
        const existe = await Cliente.findOne({nombre})

        if (existe) {
            throw new Error(`El nombre del cliente ya existe ${nombre}`)
        }
    }




export {existeClienteById,existeClienteNombre}