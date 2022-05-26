import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { proveedorGet, proveedorPost, proveedorGetbuscar, proveedorGetByid, proveedorPut, proveedorPutActivar, proveedorPutDesactivar, proveedorDelete } from "../controllers/proveedor.js";
import { existeProveedorById, existeProveedorDocumento, existeProveedorNombre } from "../helpers/proveedoresDB.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get("/",validarJWT,
validarCampos,
 proveedorGet)

router.get("/buscar",validarJWT,[
    check('buscar', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], proveedorGetbuscar)

router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeProveedorById),
    validarCampos
], proveedorGetByid)


router.post("/",validarJWT,[
    check("nombre", 'El nombre del proveedor es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("tipoPersona", 'El tipo persona  es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo documento  es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero del documento es obligatorio').trim().not().isEmpty(),
    check("direccion", 'La direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check("email", 'El correo no es valido').trim().not().isEmpty().isEmail().isLength({max:50}),
    check("nombre").custom(existeProveedorNombre),
    check("numeroDocumento").custom(existeProveedorDocumento),
    validarCampos
], proveedorPost)

router.put("/:id",validarJWT,[
    check('id', 'No es un mongold validooo').isMongoId(),
    validarCampos
], proveedorPut)

router.put("/activar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorPutActivar)

router.put("/desactivar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorPutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], proveedorDelete)

router.delete("/")

export default router

