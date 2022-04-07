import Venta from "../models/venta.js"

   const existeVentaById= async (id) => {
        const existe = await Venta.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeVentaComprobante= async (numeroComprobante) => {
        const existe = await Venta.findOne({numeroComprobante})

        if (existe) {
            throw new Error(`El numero del comprobante ya existe ${numeroComprobante}`)
        }
    }

export {existeVentaById,existeVentaComprobante}