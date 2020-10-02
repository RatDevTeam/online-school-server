import {loginValidator} from "../validators/user.validators";
import {validation} from "../utils";
import {loginUser, logout, refreshToken} from "../controllers/auth.controller";
import {Router} from "express";
const router = Router();

router.post("/login", loginValidator, validation, loginUser);
router.get("/refresh_token", refreshToken);
router.get("/logout/:userId", logout);

export default router;
