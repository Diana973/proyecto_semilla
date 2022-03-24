import Ingreso from "../models/ingreso.js"

   const existeIngresoById= async (id) => {
        const existe = await Ingreso.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeIngresoNcomprovante= async (ncomprobante) => {
        const existe = await Ingreso.findOne({ncomprobante})

        if (existe) {
            throw new Error(`El nombre de a categoria ya existe ${ncomprobante}`)
        }
    }




export {existeIngresoById,existeIngresoNcomprovante}