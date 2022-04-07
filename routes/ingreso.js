import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { ingresoGet, ingresoPost, ingresoGetbuscar, ingresoGetByid, ingresoPut, ingresoPutActivar, ingresoPutDesactivar, ingresoDelete} from "../controllers/ingreso.js";
import { existeIngresoById, existeIngresoNombre } from "../helpers/ingresoDB.js";

const router = Router()

router.get("/", ingresoGet)

router.get("/buscar",[
    check('buscar', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], ingresoGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeIngresoById),
    validarCampos
], ingresoGetByid)


router.post("/",[
    check("nombre", 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check("descripcion", 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    check("nombre").custom(existeIngresoNombre),
    validarCampos
], ingresoPost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], ingresoDelete)

router.delete("/")

export default router

