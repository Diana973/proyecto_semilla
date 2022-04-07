import Cliente from "../models/cliente.js"

   const existeClienteById= async (id) => {
        const existe = await Cliente.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeClientenDocumento= async (numeroDocumento) => {
        const existe = await Cliente.findOne({numeroDocumento})

        if (existe) {
            throw new Error(`El numero de documento ya existe ${numeroDocumento}`)
        }
    }




export {existeClienteById,existeClientenDocumento}