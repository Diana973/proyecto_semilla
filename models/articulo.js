import mongoose from "mongoose";

const ArticuloSchema=mongoose.Schema({

    codigo:{
        type:String,
        unique:true,
    },
    nombre:{ type:String,
    required:[true,"El nombre es obligatorio"],
    maxlegth:250,
    unique:true
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId,ref:'Categoria',   
        required:[true,"la categoria es obligatoria"],
        maxlegth:250
    },
    stock:{
        type:Number,
        required:true,
    },
    precioVenta:{
        type:Number,
        requerid:true,
    },
    descripcion:{
        type:String,
        requerid:true,
        maxlength:100,
    },
    estado:{
        type:Number, 
        default:1, 
    },
    createdAt:{type:Date, 
        default:Date.now
    },
          
})
export default mongoose.model("Articulo",ArticuloSchema)