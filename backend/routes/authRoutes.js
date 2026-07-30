import {Router} from "express";
import {profile, signUp, signIn } from '../controller/authController.js';
import {middlewareToProtect} from '../middlewares/authMiddleware.js';



const router = Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/profile', middlewareToProtect, profile);

export default router;

