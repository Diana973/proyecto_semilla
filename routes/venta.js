import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { ventaGet,  ventaPost,  ventaGetbuscar,  ventaGetByid,  ventaPut,  ventaPutActivar,  ventaPutDesactivar,  ventaDelete} from "../controllers/venta.js";
import { existeVentaById, existeVentaComprobante } from "../helpers/ventasDB.js";

const router = Router()

router.get("/",
validarJWT, 
ventaGet)

router.get("/buscar",[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], ventaGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampos
], ventaGetByid)


router.post("/",[
    validarJWT,
    check("cliente",'El nombre del cliente es obligatorio').not().isEmpty(),
    check("tipoComprobante",'El tipo comprobante es obligatorio').not().isEmpty(),
    check("serieComprobante",'La serie del comprobante es obligatorio').not().isEmpty(),
    check("numeroComprobante",'El numero del comprobante es obligatorio').not().isEmpty(),
    check("impuesto",'El impuesto es obligatorio').not().isEmpty(),
    check("numeroComprovante").custom(existeVentaComprobante),
    validarCampos
], ventaPost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ventaDelete)

router.delete("/")

export default router

