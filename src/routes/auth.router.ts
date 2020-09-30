import {loginValidator} from "../validators/user.validators";
import {validation} from "../utils";
import {loginUser} from "../controllers/auth.controller";
import {Router} from "express";
const router = Router();

router.post("/login", loginValidator, validation, loginUser);

export default router;
