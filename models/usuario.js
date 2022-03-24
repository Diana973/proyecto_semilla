import mongoose from 'mongoose'

const UsuarioSchema=mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        maxlength:50
    },
    rol:{
        type:String,
        required:true,
        maxlengt:20
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

