import Venta from "../models/venta.js"



const ventaPost=async (req,res)=>{
    
      const {usuario,cliente,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total}=req.body
      const venta =new Venta({usuario,cliente,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total})
      await venta.save()

      res.json(venta)
    
}

const ventaGetbuscar = async (req, res) => {     
      const query=req.query.query;
      const venta=await venta.find({$or:[
              {usaurio:new RegExp(query,'i')},
              {cliente:new RegExp(query,'i')},
          ]})
          .sort({'createdAt':-1}) 
      res.json({ 
          venta
      })
  }

  const ventaGet = async (req, res) => {     
      
      const venta=await Venta.find()
          .sort({'createdAt':-1})  
    
      res.json({ 
          venta
      })

  }

  const ventaGetByid= async (req, res ) => {
      console.log(req);
      //const { id } = req.query;
      const { id } = req.params;
      console.log(id);
      //const id =req.params.id
      const venta = await Venta.findOne({_id:id});
      res.json({
          venta
      })
  }

  const ventaPut = async (req, res) => {   
      const { id } = req.params;
      const { _id, createdAt,estado, ...resto } = req.body;
  
      const venta = await Venta.findByIdAndUpdate(id, resto);
  
      res.json({
          venta
      })
  }
  const ventaPutActivar = async (req, res) => {   
      const { id } = req.params;
  
      const venta = await Venta.findByIdAndUpdate(id, {estado:1});
  
      res.json({
          venta
      })
  }
  const ventaPutDesactivar = async (req, res) => {   
      const { id } = req.params;
  
      const venta = await Venta.findByIdAndUpdate(id, {estado:0});
  
      res.json({
          venta
      })
  }

  const ventaDelete = async (req, res) => {   
      const { id } = req.params;
  
      const venta = await Venta.findByIdAndDelete(id);
  
      res.json({
          venta
      })
  }
  
export {ventaGet,ventaPost,ventaGetbuscar,ventaGetByid,ventaPut,ventaPutActivar,ventaPutDesactivar,ventaDelete}