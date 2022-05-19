import Articulo from "../models/articulo.js"

   const existeArticuloById= async (id) => {
        const existe = await Articulo.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }
    

    const existeArticuloNombre= async (nombre) => {
        const existe = await Articulo.findOne({nombre})

        if (existe) {
            throw new Error(`El nombre del articulo ya existe ${nombre}`)
        }
    }
    const existeArticuloCodigo= async (codigo) => {
        const existe = await Articulo.findOne({codigo})

        if (existe) {
            throw new Error(`El codigo del articulo ya existe ${codigo}`)
        }
    }
    const existeArticuloStock= async (stock) => {
        const existe = await Articulo.findOne({stock})

        if (existe) {
            if(existe.stock===0){
                throw new Error(`El stock debe ser mayor a o`)
            }
            
        }
    }
    const existeArticuloPrecio= async (precioVenta) => {
        const existe = await Articulo.findOne({precioVenta})

        if (existe) {
            if(existe.precioVenta===0){
                throw new Error(`El precio debe ser mayor a o`)
            }
            
        }
    }
    


export {existeArticuloById,existeArticuloNombre,existeArticuloStock,existeArticuloPrecio,existeArticuloCodigo}