import mongoose  from "mongoose";

const dbConexion=async()=>{
    //console.log(process.env.MONGODB_CNX)

    try{
        await mongoose.connect(process.env.MONGODB_CNX,{
            UseNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("Base de datos online");
    }catch(error){
        console.log(`Error al conectar ${error}`);
        }
    
}
export {dbConexion}