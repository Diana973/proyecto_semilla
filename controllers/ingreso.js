import Ingreso from "../models/ingreso.js"



const ingresoPost=async (req,res)=>{
    
      const {usuario,proveedor,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total}=req.body
      const ingreso =new Ingreso({usuario,proveedor,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total})
      await ingreso.save()

      res.json(ingreso)
    
}

const ingresoGetbuscar = async (req, res) => {     
      const query=req.query.query;
      const ingreso=await Ingreso.find({$or:[
              {usuario:new RegExp(query,'i')},
              {proveedor:new RegExp(query,'i')},
          ]})
          .sort({'createdAt':-1}) 
    
      res.json({ 
          ingreso
      })
  }

  const ingresoGet = async (req, res) => {     
      
      const ingreso=await Ingreso.find()
          .sort({'createdAt':-1}) 
     
      res.json({ 
          ingreso
      })

  }

  const ingresoGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const ingreso = await Ingreso.findOne({_id:id});
      res.json({
          ingreso
      })
  }

  const ingresoPut = async (req, res) => {   
      const { id } = req.params;
      const { _id, createdAt,estado, ...resto } = req.body;
  
      const ingreso = await Ingreso.findByIdAndUpdate(id, resto);
  
      res.json({
          ingreso
      })
  }
  const ingresoPutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const ingreso = await Ingreso.findByIdAndUpdate(id, {estado:1});
  
      res.json({
          ingreso
      })
  }
  const ingresoPutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const ingreso = await Ingreso.findByIdAndUpdate(id, {estado:0});
  
      res.json({
          ingreso
      })
  }

  const ingresoDelete = async (req, res) => {   
      const { id } = req.params;
  
      const ingreso = await Ingreso.findByIdAndDelete(id);
  
      res.json({
          ingreso
      })
  }
  
export {ingresoGet,ingresoPost,ingresoGetbuscar,ingresoGetByid,ingresoPut,ingresoPutActivar,ingresoPutDesactivar,ingresoDelete}