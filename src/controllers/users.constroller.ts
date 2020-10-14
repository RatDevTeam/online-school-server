import {Request, Response} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.schema";
import {IUser, UserStatus} from "../models/users.interface";
import {emailTransporter} from "../utils";
import {getEmailPage} from "../utils/pages";

export const getUserList = async (req: Request, res: Response) => {
    try {
        const users: IUser[] = await Users.find({}, {password: false, _v: false});

        if (!users) {
            return res.status(404).send("Не один пользователь не найден");
        }

        return res.status(200).send(users);
    } catch (e) {
        console.log(e);
        return res.status(500).send("Что-то пошло не так");
    }
};

export const regUser = async (req: Request, res: Response) => {
    try {
        const {firstName, lastName, email, password, status} = req.body;

        const candidate = await Users.findOne({email});

        if (candidate) {
            return res.status(404).send("Пользователь с таким email уже существует");
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const user = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            status: UserStatus.STUDENT,
            activated: false,
        });

        if (status && status !== UserStatus.STUDENT) {
            user.status = status;
            user.activated = true;
        }

        const dataUser = await user.save();

        await emailTransporter.sendMail({
            from: "Подтверждение email",
            to: email,
            subject: "Актривация",
            html: getEmailPage(dataUser._id),
        });

        return res.status(201).send("Пользователь зарегистрирован");
    } catch (e) {
        console.log(e);
        return res.status(500).send("Что-то пошло не так");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        const user = await Users.findOne({email});

        if (!user) {
            return res.status(400).json({message: "Пользователь не найден"});
        }

        if (!user.activated) {
            return res.status(404).send("Пользователь еще не активирован");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({message: "Логин или пароль не верны"});
        }

        const secretKey = process.env.SECRET_KEY
            ? process.env.SECRET_KEY
            : "hellojsdfh";

        const token = jwt.sign(
            {userId: user.id, name: user.firstName, login: user.lastName},
            secretKey,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({
            token,
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("Что-то пошло не так");
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;

        if (!password) {
            return res.status(404).send("Нет нового пароля");
        }

        const candidate = await Users.findOne({email});

        if (!candidate) {
            return res.status(404).send("Пользователь с таким email не существует");
        }

        const isMatch = await bcrypt.compare(password, candidate.password);

        if (isMatch) {
            return res
                .status(404)
                .send("Пароль не должен совпадать со старым паролем");
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        await Users.update({_id: candidate._id}, {password: hashedPassword});

        return res.status(200).send("Пароль успешно обновлен обновлен");
    } catch (e) {
        console.log(e);
        return res.status(500).send("Что-то пошло не так");
    }
};
