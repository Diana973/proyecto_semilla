//const express = require('express')
import express from "express"
import cors from "cors"
import { dbConexion } from "../dataBase/config.js"

//RUTAS
import categorias from "../routes/categoria.js"
import articulos from "../routes/articulo.js"
import cliente from "../routes/cliente.js"
import usuario from "../routes/usuario.js"
import venta from "../routes/venta.js"
import auth from "../routes/auth.js"
import proveedor from "../routes/proveedor.js"
import ingresos from "../routes/ingreso.js"


class Server {
    constructor(){
        this.app=express()
        this.port=process.env.PORT
        this.middlewares()
        this.conexionDb()
        this.routes()
    }
    
    routes(){
        
        this.app.use("/api/categoria",categorias)
        this.app.use("/api/articulo",articulos)
        this.app.use("/api/cliente",cliente)
        this.app.use("/api/usuario",usuario)
        this.app.use("/api/venta",venta)
        this.app.use("/api/auth",auth)
        this.app.use("/api/proveedor",proveedor)
        this.app.use("/api/ingreso",ingresos)
    }
    async conexionDb(){
     await dbConexion()
    }
    
    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static("public"))
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`servidor escuchando en el puerto ${this.port}`)
        })
           
    
    }

}

 


export {Server}
