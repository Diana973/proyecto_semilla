import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { articuloGet,articuloPost,articuloPut,articuloPutActivar,articuloPutDesactivar, articuloDelete,articuloGetByid,articuloGetbuscar} from "../controllers/articulo.js";
import { existeArticuloById, existeArticuloNombre } from "../helpers/articulosDB.js";


const router = Router()

router.get("/", articuloGet)
router.get("/buscar",[
    check('query', 'Digite el parametro de busqueda').not().isEmpty(),
    validarCampos
], articuloGetbuscar)

router.get("/id/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampos
], articuloGetByid)


router.post("/",[
    check("nombre", 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check("descripcion", 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    check("nombre").custom(existeArticuloNombre),
    validarCampos
], articuloPost)

router.put("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPut)

router.put("/activar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPutActivar)

router.put("/desactivar/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloPutDesactivar)

router.delete("/:id",[
    check('id', 'No es un mongold valido').isMongoId(),
    validarCampos
], articuloDelete)

router.delete("/")

export default router

