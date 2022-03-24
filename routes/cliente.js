import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { clienteGet,  clientePost, clienteGetbuscar, clienteGetByid, clientePut, clientePutActivar, clientePutDesactivar, clienteDelete} from "../controllers/cliente.js";
import { existeClienteById, existeClienteRol } from "../helpers/clientesDB.js";

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
    check("rol", 'El rol es obligatorio').not().isEmpty(),
    check("rol").custom(existeClienteRol),
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

