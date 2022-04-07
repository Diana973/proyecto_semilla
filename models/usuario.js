import mongoose from 'mongoose'

const UsuarioSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
    },
    rol:{
        type:String,
        required:true,
        maxlengt:20
    },
    tipoDocumento:{
        type:String,
        required:true
    },
    numeroDocumento:{
        type:Number,
        required:true,
        maxlengt:20,
        unique:true
    },
    direccion:{
        type:String,
        required:true,
        maxlengt:50
    },
    telefono:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        maxlength:50,
        unique:true
    },
    password:{
        type:String,
        required:true
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

export default mongoose.model('Usuario',UsuarioSchema)

