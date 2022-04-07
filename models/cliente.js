import mongoose from 'mongoose'

const ClienteSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:50,
        unique:true,
    },
    tipoPersona:{
        type:String,
    },
    tipoDocumento:{
        type:String,
    },
    numeroDocumento:{
        type:String,
        required:true,
        maxlength:50
    },
    direccion:{
        type:String,
    },
    telefono:{
        type:String,
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

export default mongoose.model("Cliente",ClienteSchema)