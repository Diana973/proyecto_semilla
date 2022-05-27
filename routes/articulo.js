import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { articuloGet,articuloPost,articuloPut,articuloPutActivar,articuloPutDesactivar, articuloDelete,articuloGetByid,articuloGetbuscar} from "../controllers/articulo.js";
import { existeArticuloById, existeArticuloNombre, existeArticuloStock,existeArticuloPrecio,existeArticuloCodigo } from "../helpers/articulosDB.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { checkRol } from "../middlewares/permitirRol.js";



const router = Router()

router.get("/",validarJWT, 
checkRol(["Administrador","Almacenista"]),
validarCampos,
articuloGet,

)
router.get("/buscar",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('query', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], articuloGetbuscar)

router.get("/id/:id", validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
], articuloGetByid)

router.post("/",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check("nombre", 'El nombre del articulo es obligatorio').trim().not().isEmpty().isLength({max:100}),
    check("descripcion", 'La descripcion del articulo es obligatorio').trim().not().isEmpty().isLength({max:200}),
    check("codigo", 'El codigo del articulo es obligatorio').trim().not().isEmpty(),
    check("categoria", 'La categoria del articulo es obligatorio').trim().not().isEmpty().isLength({max:100}),
    check("stock", 'El stock del articulo es obligatorio').trim().not().isEmpty(),
    check("precioVenta", 'El precio del articulo es obligatorio').trim().not().isEmpty(),
    check("nombre").custom(existeArticuloNombre),
    check("codigo").custom(existeArticuloCodigo),
    check("stock").custom(existeArticuloStock),
    check("precioVenta").custom(existeArticuloPrecio),
    validarCampos
], articuloPost)

router.put("/:id",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPut)

router.put("/activar/:id",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPutActivar)

router.put("/desactivar/:id",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloDelete)

router.delete("/")

export default router

