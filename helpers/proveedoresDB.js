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
            throw new Error(`El nombre de a categoria ya existe ${nombre}`)
        }
    }




export {existeProveedorById,existeProveedorNombre}