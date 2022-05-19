import Ingreso from "../models/ingreso.js"

   const existeIngresoById= async (id) => {
        const existe = await Ingreso.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeIngresoNcomprobante= async (numeroComprobante) => {
        const existe = await Ingreso.findOne({numeroComprobante})

        if (existe) {
            throw new Error(`El numero del comprobante ya existe ${numeroComprobante}`)
        }
    }




export {existeIngresoById,existeIngresoNcomprobante}