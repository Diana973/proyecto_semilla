import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { proveedorGet, proveedorPost, proveedorGetbuscar, proveedorGetByid, proveedorPut, proveedorPutActivar, proveedorPutDesactivar, proveedorDelete} from "../controllers/proveedor.js";
import { existeProveedorById, existeProveedorNombre} from "../helpers/proveedoresDB.js";

const router = Router()

router.get("/", proveedorGet)
router.get("/buscar",[
    check('buscar', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], proveedorGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeProveedorById),
    validarCampos
], proveedorGetByid)


router.post("/",[
    check("nombre", 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check("descripcion", 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    check("nombre").custom(existeProveedorNombre),
    validarCampos
], proveedorPost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorDelete)

router.delete("/")

export default router

