import Cliente from "../models/cliente.js"



const clientePost=async (req,res)=>{
    
      const {nombre,tipoPersona,tipoDocumento,numeroDocumento,direccion,telefono,email}=req.body
      const cliente =new Cliente({nombre,tipoPersona,tipoDocumento,numeroDocumento,direccion,telefono,email})
      await cliente.save()

      res.json(Cliente)
    
}

const clienteGetbuscar = async (req, res) => {     
      const query=req.query.query;
      const cliente=await Cliente.find({$or:[
              {nombre:new RegExp(query,'i')},
              {tipoPersona:new RegExp(query,'i')},
          ]})
          .sort({'createdAt':-1}) 
      res.json({ 
          cliente
      })
  }

  const clienteGet = async (req, res) => {     
      
      const cliente=await Cliente.find()
          .sort({'createdAt':-1})  
    
          res.json({ 
          cliente
      })

  }

  const clienteGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const cliente = await Cliente.findOne({_id:id});
      res.json({
          cliente
      })
  }

  const clientePut = async (req, res) => {   
      const { id } = req.params;
      const { _id, createdAt,estado, ...resto } = req.body;
  
      const cliente = await Cliente.findByIdAndUpdate(id, resto);
  
      res.json({
          cliente
      })
  }
  const clientePutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const cliente = await Cliente.findByIdAndUpdate(id, {estado:1});
  
      res.json({
          cliente
      })
  }
  const clientePutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const cliente = await Cliente.findByIdAndUpdate(id, {estado:0});
  
      res.json({
          cliente
      })
  }

  const clienteDelete = async (req, res) => {   
      const { id } = req.params;
  
      const cliente = await Cliente.findByIdAndDelete(id);
  
      res.json({
          cliente
      })
  }
  
export {clienteGet,clientePost,clienteGetbuscar,clienteGetByid,clientePut,clientePutActivar,clientePutDesactivar,clienteDelete}