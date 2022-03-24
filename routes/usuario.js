import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { usuarioGet, usuarioPost, usuarioGetbuscar, usuarioGetByid, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, usuarioDelete} from "../controllers/usuario.js";
import { existeUsuarioById } from "../helpers/usuariosDB.js";

const router = Router()

router.get("/",usuarioGet)
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
    check("rol", 'El rol es obligatorio').not().isEmpty(),
    check("nombre", 'El nombre es obligatorio').not().isEmpty(),
    check("password", 'El password debe ser mas de 8 caracteres').isLength({min:6}),
    check("email", 'El correo no es valido').isEmail(),
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

