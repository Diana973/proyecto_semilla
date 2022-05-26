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
    check("nombre", 'El nombre del cliente es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("tipoPersona", 'El tipo de persona es obligatorio').trim().not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero del documento es obligatorio').trim().not().isEmpty().isLength({max:20}),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty(),
    check("email",'El email es obligatorio').trim().not().isEmpty().isLength({max:50}),
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

