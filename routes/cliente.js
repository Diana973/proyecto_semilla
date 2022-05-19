import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { clienteGet,  clientePost, clienteGetbuscar, clienteGetByid, clientePut, clientePutActivar, clientePutDesactivar, clienteDelete} from "../controllers/cliente.js";
import { existeClienteById, existeClientenDocumento } from "../helpers/clientesDB.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get("/",
validarJWT,
validarCampos,
clienteGet)

router.get("/buscar",validarJWT,[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], clienteGetbuscar)

router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeClienteById),
    validarCampos
], clienteGetByid)


router.post("/",validarJWT,[
    check("nombre", 'El nombre es obligatorio').not().isEmpty().trim(),
    check("tipoPersona", 'El tipo de persona es obligatorio').not().isEmpty().trim(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').not().isEmpty().trim(),
    check("numeroDocumento", 'El numero del documento es obligatorio').not().isEmpty().trim(),
    check("direccion", 'la direccion es obligatoria').not().isEmpty().trim(),
    check("telefono", 'El telefono es obligatorio').not().isEmpty().trim(),
    check("numeroDocumento").custom(existeClientenDocumento),
    validarCampos
], clientePost)

router.put("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePut)

router.put("/activar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePutActivar)

router.put("/desactivar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clienteDelete)

router.delete("/")

export default router

