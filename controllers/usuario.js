import Usuario from "../models/usuario.js"
import bcryptjs from "bcryptjs"



const usuarioPost = async (req,res)=>{
    
      const {nombre,rol,email,password}=req.body
      const usuario = new Usuario({nombre,rol,email,password})
     
    //encriptar
      const salt=bcryptjs.genSaltSync(10);
      usuario.password=bcryptjs.hashSync(password,salt);
      await usuario.save()

      res.json(usuario)
    
}

const usuarioPut = async (req, res) => {   
    const { id } = req.params;
    const { _id, email,estado,password, ...resto } = req.body;

    if(password){
        const salt=bcryptjs.genSaltSync(10);
        resto.password=bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}

const usuarioGetbuscar = async (req, res) => {     
      const query=req.query.query;
      console.log(query);
      const usuario=await Usuario.find({$or:[
              {nombre:new RegExp(query,'i')},
              {rol:new RegExp(query,'i')},
          ]})
          .sort({'createdAt':-1}) 
      res.json({ 
        usuario
      })
  }

  const usuarioGet = async (req, res) => {     
      
      const usuario=await Usuario.find()
          .sort({'createdAt':-1})  //descendente  1 para ascendente
      //const categoria=await Categoria.find({},{nombre:1});//solo muestra el nombre
      res.json({ 
          usuario
      })

  }

  const usuarioGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const usuario = await Usuario.findOne({_id:id});
      res.json({
          usuario
      })
  }

  
  const usuarioPutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const usuario = await Usuario.findByIdAndUpdate(id, {estado:1});
  
      res.json({
          usuario
      })
  }
  const usuarioPutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const usuario = await Usuario.findByIdAndUpdate(id, {estado:0});
  
      res.json({
          usuario
      })
  }

  const usuarioDelete = async (req, res) => {   
      const { id } = req.params;
  
      const usuario = await Usuario.findByIdAndDelete(id);
  
      res.json({
          usuario
      })
  }
  
export {usuarioGet,usuarioPost,usuarioGetbuscar,usuarioGetByid,usuarioPut,usuarioPutActivar,usuarioPutDesactivar,usuarioDelete}