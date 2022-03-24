import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { ventaGet,  ventaPost,  ventaGetbuscar,  ventaGetByid,  ventaPut,  ventaPutActivar,  ventaPutDesactivar,  ventaDelete} from "../controllers/ venta.js";
import { existeVentaById, existeVentaUsuario } from "../helpers/ventasDB.js";

const router = Router()

router.get("/",ventaGet)
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
    check("usuario", 'El usuario es obligatorio').not().isEmpty(),
    check("usuario").custom(existeVentaUsuario),
    validarCampos
], usuarioPost)

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

