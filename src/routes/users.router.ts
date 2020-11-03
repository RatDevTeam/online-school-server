import { resetPassword } from "./../controllers/users.constroller";
import { Router } from "express";
import { getUserList, loginUser, regUser } from "../controllers/users.constroller";
import {
  regUserValidator,
  loginValidator,
  passwordValidator,
} from "../validators/user.validators";
import { validation } from "../utils";
const router = Router();

router.get("/", getUserList);

router.post("/register", regUserValidator, validation, regUser);

router.post("/login", loginValidator, validation, loginUser);

router.post("/reset-password", passwordValidator, validation, resetPassword);

export default router;
