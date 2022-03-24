import mongoose from 'mongoose'

const VentaSchema=mongoose.Schema({
    usuario:{
        type:String,
        reqired:true,
        maxlength:50,
    },
    cliente:{
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
export default mongoose.model("Venta",VentaSchema)