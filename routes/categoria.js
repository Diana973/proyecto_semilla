import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { categoriaGet, categoriaPost, categoriaGetbuscar, categoriaGetByid, categoriaPut, categoriaPutActivar, categoriaPutDesactivar, categoriaDelete} from "../controllers/categoria.js";
import { existeCategoriaById, existeCategoriaNombre } from "../helpers/categoriasDB.js";

const router = Router()

router.get("/",categoriaGet)
router.get('/buscar',[
    check('query','Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], categoriaGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], categoriaGetByid)


router.post("/",[
    check("nombre", 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check("descripcion", 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    check("nombre").custom(existeCategoriaNombre),
    validarCampos
], categoriaPost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], categoriaDelete)

router.delete("/")

export default router

