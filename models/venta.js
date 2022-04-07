import mongoose from 'mongoose'

const VentaSchema=mongoose.Schema({
    usuario:{
        type:mongoose.Schema.Types.ObjectId,ref:'Usuario',   
        required:true,
        maxlegth:50
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId,ref:'Cliente',   
        required:[true,"El cliente es obligatorio"],
        maxlegth:50
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