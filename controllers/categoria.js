import Categoria from "../models/categoria.js"



const categoriaPost=async (req,res)=>{
    
      const {nombre,descripcion}=req.body
      
      const categoria =new Categoria({nombre,descripcion})
      await categoria.save()

      res.json(categoria)
    
}

const categoriaGetbuscar = async (req, res) => {     
    const query=req.query.query;
    console.log(query);
    const categoria=await Categoria.find({$or:[
            {nombre:new RegExp(query,'i')},
           
        ]})
        .sort({'createdAt':-1})  
   
    res.json({ 
        categoria
    })
}


  const categoriaGet = async (req, res) => {     
      
      const categoria=await Categoria.find()
          .sort({'createdAt':-1})  //descendente  1 para ascendente
      //const categoria=await Categoria.find({},{nombre:1});//solo muestra el nombre
      res.json({ 
          categoria
      })

  }

  const categoriaGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const categoria = await Categoria.findOne({_id:id});
      res.json({
          categoria
      })
  }

  const categoriaPut = async (req, res) => {   
      const { id } = req.params;
      const { _id, createdAt,estado, ...resto } = req.body;
  
      const categoria = await Categoria.findByIdAndUpdate(id, resto);
  
      res.json({
          categoria
      })
  }
  const categoriaPutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const categoria = await Categoria.findByIdAndUpdate(id, {estado:1});
  
      res.json({
          categoria
      })
  }
  const categoriaPutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const categoria = await Categoria.findByIdAndUpdate(id, {estado:0});
  
      res.json({
          categoria
      })
  }

  const categoriaDelete = async (req, res) => {   
      const { id } = req.params;
  
      const categoria = await Categoria.findByIdAndDelete(id);
  
      res.json({
          categoria
      })
  }
  
export {categoriaGet,categoriaPost,categoriaGetbuscar,categoriaGetByid,categoriaPut,categoriaPutActivar,categoriaPutDesactivar,categoriaDelete}