import Proveedor from "../models/proveedor.js"

   const existeProveedorById= async (id) => {
        const existe = await Proveedor.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeProveedorNombre= async (nombre) => {
        const existe = await Proveedor.findOne({nombre})

        if (existe) {
            throw new Error(`El nombre del proveedor ya existe ${nombre}`)
        }
    }

    const existeProveedorDocumento= async (numeroDocumento) => {
        const existe = await Proveedor.findOne({numeroDocumento})
        if (existe) {
            throw new Error(`El numero de documento ya existe ${numeroDocumento}`)
        }
    }




export {existeProveedorById,existeProveedorNombre,existeProveedorDocumento}