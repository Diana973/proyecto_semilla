import mongoose from 'mongoose'

const IngresoSchema=mongoose.Schema({

    usuario:{
        type:mongoose.Schema.Types.ObjectId,ref:'Usuario',   
        required:true,
        maxlegth:50
    },
    proveedor:{
        type:mongoose.Schema.Types.ObjectId,ref:'Proveedor',   
        required:[true,"El proveedor es obligatorio"],
        maxlegth:50
    },
    tipoComprobante:{
        type:String,
    },
    serieComprobante:{
        type:String,
    },

    numeroComprobante:{
        type:Number,
    },

    fecha:{
        type:Date,
        default:Date.now
    },
    impuesto:{
        type:Number,
    },
    total:{
        type:Number,
    },
    estado:{
        type:Number,
        default:1
    },
    createAt:{
        type:Date,
        default: Date.now
    },

    detalles:[{
    
        id:{
            type:String,  
        },
        nombreProducto:{
           type:String,
           required:true,
        },
        cantidad:{
            type:Number,
            required:true,
        },
        
        precio:{
            type:Number,
           
        },
        subtotal:{
            type:Number,
        }
    }]

})
export default mongoose.model("Ingreso",IngresoSchema)