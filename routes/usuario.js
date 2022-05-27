import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { usuarioGet, usuarioPost, usuarioGetbuscar, usuarioGetByid, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, usuarioDelete} from "../controllers/usuario.js";
import { existeUsuarioById,existeUsuarioNombre } from "../helpers/usuariosDB.js";

const router = Router()

router.get("/", 
validarCampos,usuarioGet)

router.get("/buscar",[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], usuarioGetbuscar)


router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioGetByid)

router.post("/",[
    check("rol", 'El rol es obligatorio').trim().not().isEmpty().isLength({max:20}),
    check("nombre", 'El nombre es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("password",'El password debe ser mas de 8 caracteres').trim().not().isEmpty().isLength({min:6 ,max:15}),
    check("tipoDocumento", 'El tipo documento es obligatorio').trim().not().isEmpty(),
    check("numeroDocumento", 'El numero documento es obligatorio').trim().not().isEmpty().isLength({max:20}),
    check("direccion", 'la direccion es obligatoria').trim().not().isEmpty(),
    check("telefono", 'El telefono es obligatorio').trim().not().isEmpty().isLength({max:50}),
    check("email", 'El correo no es valido').trim().not().isEmpty().isEmail(),
    
    check("nombre").custom(existeUsuarioNombre),
    validarCampos
],usuarioPost)



router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioDelete)

router.delete("/")

export default router

