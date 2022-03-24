import mongoose from 'mongoose'

const IngresoSchema=mongoose.Schema({

    usuario:{
        type:String,
        reqired:[true, "El usuario es obligatorio"],
        maxlength:150,
    },
    proveedor:{
        type:String,
        required:true,
    },
    tipoComprobante:{
        type:String,
    },
    serieComprobante:{
        type:Number,
    },
    numeroComprobante:{
        type:Number,
    },
    fecha:{
        type:Date,
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
    }

})
export default mongoose.model("Ingreso",IngresoSchema)