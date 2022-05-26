import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { ingresoGet, ingresoPost, ingresoGetbuscar, ingresoGetByid, ingresoPut, ingresoPutActivar, ingresoPutDesactivar, ingresoDelete} from "../controllers/ingreso.js";
import { existeIngresoById, existeIngresoNcomprobante,existeArticuloStock } from "../helpers/ingresosDB.js";

const router = Router()

router.get("/",
validarJWT,
validarCampos,
 ingresoGet)

router.get("/buscar",validarJWT,[
    check('buscar', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], ingresoGetbuscar)

router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeIngresoById),
    validarCampos
], ingresoGetByid)


router.post("/",validarJWT,[
    check("usuario",'El nombre del usuario es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("proveedor",'El nombre del proveedor es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("tipoComprobante",'El tipo comprobante es obligatorio').trim().not().isEmpty(),
    check("serieComprobante",'La serie del comprobante es obligatorio').trim().not().isEmpty(),
    check("numeroComprobante",'El numero del comprobante es obligatorio').trim().not().isEmpty(),
    check("impuesto",'El impuesto es obligatorio').trim().not().isEmpty(),
    check("nComprovante").custom( existeIngresoNcomprobante),
    check("detalles").custom(existeArticuloStock),
    validarCampos
], ingresoPost)

router.put("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPut)

router.put("/activar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPutActivar)

router.put("/desactivar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoDelete)

router.delete("/")

export default router


