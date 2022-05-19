import mongoose from "mongoose";

const CategoriaSchema=mongoose.Schema({
    nombre:{ type:String,
    required:[true,"El nombre es obligatorio"],
    maxlegth:250,
    unique:true
    },
    descripcion:{
        type:String,
        required:[true,"la descripcion es obligatoria"],
        maxlegth:250
    },
    estado:{
        type:Number, 
        default:1, 
    },
    createdAt:{type:Date, 
        default:Date.now
    },


    
    
})
export default mongoose.model("Categoria",CategoriaSchema)