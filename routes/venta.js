import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { ventaGet,  ventaPost,  ventaGetbuscar,  ventaGetByid,  ventaPut,  ventaPutActivar,  ventaPutDesactivar,  ventaDelete} from "../controllers/venta.js";
import { existeVentaById, existeVentaComprobante,existeArticuloStock} from "../helpers/ventasDB.js";

const router = Router()

router.get("/",
validarJWT,
validarCampos, 
ventaGet)


router.get("/buscar",validarJWT,[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], ventaGetbuscar)

router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
], ventaGetByid)


router.post("/",validarJWT,[
    check("usuario",'El nombre del usuario es obligatorio').trim().not().isEmpty().isLength({max:100}),
    check("cliente",'El nombre del cliente es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("tipoComprobante",'El tipo comprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante",'La serie del comprobante es obligatorio').trim().not().isEmpty(),
    check("numeroComprobante",'El numero del comprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto",'El impuesto es obligatorio').trim().not().isEmpty(),
    check("detalles").custom(existeArticuloStock),
    check("numeroComprovante").custom(existeVentaComprobante),
    validarCampos
], ventaPost)

router.put("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPut)

router.put("/activar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPutActivar)

router.put("/desactivar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaDelete)

router.delete("/")

export default router

