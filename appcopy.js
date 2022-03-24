const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/hoola', function (req, res) {
    res.json({msg:"Registro agregado"})
  })

app.post('/hola',function(req,res){
    res.json({msg:"Registro agregado"})
})

app.put('/edit', function (req, res) {
    res.json({msg:"Registro modificado"})
  })

app.put('/hola', function (req, res) {
    res.json({msg:"Registro hola modificado"})
  })

  //funcion flecha 
app.delete('/', (req,res) =>{
    res.status(400).json({msg:"Registro eliminado"})
})

app.post('/registro', (req,res)=>{
    res.json({
        id:1,
        nombre:"lucia",
        cc:"1096514098"
    })
})

app.put('/edit_registro',(req,res)=>{
    res.json({
        msg:"exitosa"
    })
})

app.listen(3001)
console.log("inicio")