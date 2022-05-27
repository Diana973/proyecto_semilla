import Ingreso from "../models/ingreso.js"
import Articulo from "../models/articulo.js"

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

    const existeArticuloStock= async (detalles) => {
        if (detalles) {
            
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i]
                const articulo = await Articulo.findById(detalle.id)
                if (articulo) {
                    if ((articulo.stock - detalle.cantidad) < 0) {
                        throw new Error(`Stock insuficiente del articulo: ${articulo.nombre}`)
                    }
                }else{
                    throw new Error(`Stock insuficiente del articulo: ${articulo.nombre}`)
                }
            }
        }
    }

    const detallesVacios = async (detalles) => {
        if (detalles) {
    
            for (let i = 0; i < detalles.length; i++) {
                const detalle = detalles[i]
    
    
                if (detalle.nombreProducto === "" || detalle.cantidad==="" || detalle.precio==="" || detalle.descuento=== "") {
                    throw new Error('Agrega un articulo')
                }
               
            }
        }
    }
    
     const detallesVacio = async (detalles, next) => {
    
        if(detalles.length ==0){
    
         throw new Error(`Agregue productos a la venta`)
    
        }
    
    
         }


export {existeIngresoById,existeIngresoNcomprobante,existeArticuloStock,detallesVacio,detallesVacios}