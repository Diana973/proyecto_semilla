import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { usuarioGet, usuarioPost, usuarioGetbuscar, usuarioGetByid, usuarioPut, usuarioPutActivar, usuarioPutDesactivar, usuarioDelete} from "../controllers/usuario.js";
import { existeUsuarioById,existeUsuarioNombre } from "../helpers/usuariosDB.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router()

router.get("/" ,validarJWT, 
validarCampos,usuarioGet)

router.get("/buscar",validarJWT,[
    check('buscar','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], usuarioGetbuscar)


router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos
], usuarioGetByid)

router.post("/",validarJWT,[
    check("rol", 'El rol es obligatorio').trim().not().isEmpty(),
    check("nombre", 'El nombre es obligatorio').trim().not().isEmpty(),
    check("password",'El password debe ser mas de 8 caracteres').trim().not().isEmpty().isLength({min:6 ,max:15}),
    check("email", 'El correo no es valido').trim().not().isEmpty().isEmail(),
    check("nombre").custom(existeUsuarioNombre),
    validarCampos
],usuarioPost)

router.put("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPut)

router.put("/activar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPutActivar)

router.put("/desactivar/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioPutDesactivar)

router.delete("/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], usuarioDelete)

router.delete("/")

export default router

