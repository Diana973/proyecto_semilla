import { response } from "express"
import jwt from 'jsonwebtoken'
import usuario  from "../models/usuario.js";
//import {existeUsuarioPold} from '../helpers/db-validator-usuarios.js';



const validarJWT= async(req,res=response,next) =>{
      const token=req.header('x-token');

      if(!token){
          return res.status(401).json({
              msg:'No hay token en la peticion'
          })
      }

      try{
          const {uid}=jwt.verify(token , process.env.SECRETOPRIVATEKEY);

          const usuario= await usuario.findById({_id:uid});

          if(!usuario){
              return res.status(401).json({
                msg:'Token no  valido' //-usuario no existe en DB
              })
          }
          //verificar si el usuario id tiene estado true
          if(usuario.estado==0){
              return res.status(401).json({
                msg:'Token no  valido' //-usuario con estado:false
              })
          }
          req.usuario=usuario;

          next();
        }catch(e){
          console.log(e);
          res.status(401).json({
            msg:'Token no  valido'
          })
      }

}

async function checkToken(token){
    let__id=null;
    try{
        const{_id}=await jwt.decode(token);
        __id=_id;
    }catch(e){
        return false;
    }
    //const existeUsuario=existeUsuarioPold(__id);
}



const generarJWT=(uid='')=>{//identificador unico de usuario
      return new Promise((resolve,reject)=>{
          //checkToken();
          const payload={uid};

          jwt.sign(payload , process.env.SECRETOPRIVATEKEY,{
              expiresIn:'1m' // 4hr
          }),(err,token)=>{
              if(err){
                  console.log(err);
                  reject('No se pudo generar el token ')
              }else{
                  resolve(token)
              }
          }
      })
}

export {validarJWT,generarJWT}