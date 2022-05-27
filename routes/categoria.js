import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { categoriaGet, categoriaPost, categoriaGetbuscar, categoriaGetByid, categoriaPut, categoriaPutActivar, categoriaPutDesactivar, categoriaDelete} from "../controllers/categoria.js";
import { existeCategoriaById, existeCategoriaNombre } from "../helpers/categoriasDB.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { checkRol } from "../middlewares/permitirRol.js";

const router = Router()

router.get("/",
    validarJWT,
    checkRol(["Administrador","Almacenista"]),
    validarCampos
,categoriaGet)



router.get('/buscar',
     validarJWT,[
    check('query','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], categoriaGetbuscar)

router.get("/id/:id",validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaGetByid)



router.post("/",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check("nombre", 'El nombre de la categoria es obligatoria').trim().not().isEmpty().isLength({max:100}),
    check("descripcion", 'La descripcion de la categoria es obligatoria').trim().not().isEmpty().isLength({max:250}),
    check("nombre").custom(existeCategoriaNombre),
    validarCampos,
    
], categoriaPost)

router.put("/:id", validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check("nombre", 'El nombre de la categoria es obligatoria').trim().not().isEmpty(),
    check("descripcion", 'La descripcion de la categoria es obligatoria').trim().not().isEmpty(),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPut)

router.put("/activar/:id",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPutActivar)

router.put("/desactivar/:id",validarJWT,[
    checkRol(["Administrador","Almacenista"]),
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPutDesactivar)

router.delete("/:id",
    validarJWT,[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaDelete)

router.delete("/")

export default router

