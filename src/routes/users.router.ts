import { Router } from 'express';
import {getUser, loginUser, regUser} from "../controllers/users.constroller";
import { regUserValidator, loginValidator } from "../validators/user.validators";
import { validation } from "../utils";
const router = Router();

router.get('/', getUser);

router.post('/register', regUserValidator, validation, regUser);

router.post('/login', loginValidator, validation, loginUser);

export default router;
