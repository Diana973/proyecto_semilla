import Proveedor from "../models/proveedor.js"

const proveedorPost=async (req,res)=>{
    
      const {nombre,tipoPersona,tipoDocumento,numeroDocumento,direccion,telefono,email}=req.body
      const proveedor =new Proveedor({nombre,tipoPersona,tipoDocumento,numeroDocumento,direccion,telefono,email})
      await proveedor.save()

      res.json(proveedor)
    
}

const proveedorGetbuscar = async (req, res) => {     
      const query=req.query.query;
      const proveedor = await Proveedor.find({$or:[
              {tipoPersona:new RegExp(query,'i')},
              {numeroDocumento:new RegExp(query,'i')},
          ]})
          .sort({'createdAt':-1}) 
      
      res.json({ 
        proveedor
      })
  }

  const proveedorGet = async (req, res) => {     
      
      const proveedor=await Proveedor.find()
          .sort({'createdAt':-1}) 
     
      res.json({ 
        proveedor
      })


  }

  const proveedorGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const proveedor = await Proveedor.findOne({_id:id});
      res.json({
        proveedor
      })
  }

  const proveedorPut = async (req, res) => {   
      const { id } = req.params;
      const { _id, createdAt,estado, ...resto } = req.body;
  
      const proveedor = await Proveedor.findByIdAndUpdate(id, resto);
  
      res.json({
        proveedor
      })
  }
  const proveedorPutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const proveedor = await Proveedor.findByIdAndUpdate(id, {estado:1});
  
      res.json({
        proveedor
      })
  }
  const proveedorPutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const proveedor = await Proveedor.findByIdAndUpdate(id, {estado:0});
  
      res.json({
        proveedor
      })
  }

  const proveedorDelete = async (req, res) => {   
      const { id } = req.params;
  
      const proveedor = await Proveedor.findByIdAndDelete(id);
  
      res.json({
        proveedor
      })
  }
  
export {proveedorGet,proveedorPost,proveedorGetbuscar,proveedorGetByid,proveedorPut,proveedorPutActivar,proveedorPutDesactivar,proveedorDelete}