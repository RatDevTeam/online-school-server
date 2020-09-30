import { resetPassword } from "./../controllers/users.constroller";
import { Router } from "express";
import { getUser, regUser } from "../controllers/users.constroller";
import {
  regUserValidator,
  passwordValidator,
} from "../validators/user.validators";
import { validation } from "../utils";
const router = Router();

router.get("/", getUser);

router.post("/register", regUserValidator, validation, regUser);

router.post("/reset-password", passwordValidator, validation, resetPassword);

export default router;
