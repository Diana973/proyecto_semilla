import {response} from "express";
import Usuario from '../models/usuario.js'
import bcryptjs from "bcryptjs"
import {generarJWT} from "../middlewares/validar-jwt.js";

const login = async (req, res = response) =>{
       const {email,password} = req.body;
       try {
           // verififcar si el email existe 
           const usuario = await Usuario.findOne({email});
           if (!usuario){
               return res.status(400).json({
                   msg:'Usuario/password no son correctos'
               })
           }

        //si esta activo
        if (usuario.estado===0){
            return res.status(400).json({
                msg:'Usuario/password no son correctos'
            })
        }
        //verificar contraseña
        const validarPassword=bcryptjs.compareSync(password,usuario.password);
        if (!validarPassword){
            return res.status(400).json({
                msg:'Usuario/password no son correctos'
            })
        }
        
        // generar jwt
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,token
        })
       } catch (e) {
         console.log(e)
       }
}

export  {login}