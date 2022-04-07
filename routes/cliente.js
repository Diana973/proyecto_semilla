import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { clienteGet,  clientePost, clienteGetbuscar, clienteGetByid, clientePut, clientePutActivar, clientePutDesactivar, clienteDelete} from "../controllers/cliente.js";
import { existeClienteById, existeClientenDocumento } from "../helpers/clientesDB.js";

const router = Router()

router.get("/",clienteGet)

router.get("/buscar",[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], clienteGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeClienteById),
    validarCampos
], clienteGetByid)


router.post("/",[
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("tipoPersona", 'El tipo de persona es obligatorio').not().isEmpty(),
    check("tipoDocumento", 'El tipo de documento es obligatorio').not().isEmpty(),
    check("numeroDocumento", 'El numero del documento es obligatorio').not().isEmpty(),
    check("direccion", 'la direccion es obligatoria').not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').not().isEmpty(),
    check("numeroDocumento").custom(existeClientenDocumento),
    validarCampos
], clientePost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clientePutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], clienteDelete)

router.delete("/")

export default router

