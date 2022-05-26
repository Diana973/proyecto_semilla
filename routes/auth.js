import {Router} from 'express'
import {check} from 'express-validator';
import {login} from '../controllers/auth.js';
import {validarCampos} from '../middlewares/validar_campos.js';


const router = Router();


router.post("/",[
     check('email','El email es obligatorio').trim().not().isEmpty().isEmail().isLength({max:50}),
     check('password', 'La contraseña es obligatoria').trim().not().isEmpty().isLength({min:6 ,max:15}),
     validarCampos
],   login);

export default router 