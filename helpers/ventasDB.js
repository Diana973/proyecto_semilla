import Venta from "../models/venta.js"

   const existeVentaById= async (id) => {
        const existe = await Venta.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeVentaNombre= async (numeroComprobante) => {
        const existe = await Venta.findOne({numeroComprobante})

        if (existe) {
            throw new Error(`El nombre de a  ya existe ${numeroComprobante}`)
        }
    }




export {existeVentaById,existeVentaNombre}