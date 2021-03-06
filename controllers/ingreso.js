import Ingreso from "../models/ingreso.js"
import Articulo from "../models/articulo.js"


const ingresoPost=async (req,res)=>{
    
      const {usuario,proveedor,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total,detalles}=req.body
      const ingreso =new Ingreso({usuario,proveedor,tipoComprobante,serieComprobante,numeroComprobante,fecha,impuesto,total,detalles})
      
      ingreso.detalles.forEach(async (e) => {e.subtotal=(e.cantidad * e.precio)
      let { stock } = await Articulo.findById({ _id: e.id });
      stock = stock - e.cantidad
      await Articulo.findByIdAndUpdate(e.id, { stock })
      console.log(e.nombreProducto);
      })
     
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
      .populate('usuario','nombre')
      .populate('proveedor','nombre')
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