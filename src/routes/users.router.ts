import { Router } from "express";
import {editUser, getUserList, regUser, resetPassword} from "../controllers/users.constroller";
import {
  regUserValidator,
  passwordValidator,
} from "../validators/user.validators";
import { validation } from "../utils";
const router = Router();

router.get("/", getUserList);

router.post("/register", regUserValidator, validation, regUser);

router.post("/reset-password", passwordValidator, validation, resetPassword);

router.post('/change/:id', editUser)

export default router;
