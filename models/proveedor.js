import mongoose from 'mongoose'

const ProveedorSchema=mongoose.Schema({
    nombre:{
        type:String,
        reqired:true,
        maxlength:50,
    },
    tipoPersona:{
        type:String,
        reqired:true,
    },
    tipoDocumento:{
        type:String,
        required:true,
    },
    numeroDocumento:{
        type:Number,
        unique:true
    },
    direccion:{
        type:String,
    },
    telefono:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
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
export default mongoose.model("Proveedor",ProveedorSchema)