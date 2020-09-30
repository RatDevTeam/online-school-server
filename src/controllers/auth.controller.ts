import {Request, Response} from "express";
import User from "../models/users.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Пользователь не найден" });
        }

        if (!user.activated) {
            return res.status(404).send("Пользователь еще не активирован");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Логин или пароль не верны" });
        }

        const secretKey = process.env.SECRET_KEY
            ? process.env.SECRET_KEY
            : "hello";

        const token = jwt.sign(
            { userId: user.id, name: user.firstName, login: user.lastName },
            secretKey,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).cookie('test', 'dddddddddd', {domain: 'localhost'}).json({
            token,
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (e) {
        return res.status(500).send("Что-то пошло не так");
    }
};
