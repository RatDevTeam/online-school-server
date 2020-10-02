import {Request, Response} from "express";
import User from "../models/users.schema";
import Session from "../models/session.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

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
                expiresIn: '15m',
            }
        );

        const session = new Session({
            userId: user._id,
            refreshToken: v4(),
            expiresId: 5184000000,
        });

        await session.save();

        res.status(200).cookie('refreshToken', session.refreshToken, {domain: 'localhost', maxAge: 5184000000, httpOnly: true}).json({
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

export const refreshToken = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.cookies;

        const sessions = await Session.findOne({ refreshToken });

        if (!sessions) {
            return res.status(400).json({ message: 'Нет активной сессии' });
        }

        const secretKey = process.env.SECRET_KEY
            ? process.env.SECRET_KEY
            : "hello";

        const newAccessToken = jwt.sign(
            {},
            secretKey,
            {
                expiresIn: 10,
            }
        );

        const newRefreshToken = v4();

        await Session.update({ _id: sessions._id }, { refreshToken: newRefreshToken });

        return res.status(200).cookie('refreshToken', newRefreshToken, {domain: 'localhost', maxAge: 5184000000, httpOnly: true}).send({ token: newAccessToken })
    } catch (e) {
        return res.status(500).send("Что-то пошло не так");
    }
};

export const logout = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { refreshToken } = req.cookies;

        const sessions = await Session.findOne({ userId, refreshToken });

        if (!sessions) {
            return res.status(200).cookie('refreshToken', '', {domain: 'localhost', maxAge: 1, httpOnly: true}).send('такой сессии нет');
        }

        await Session.remove({ _id: sessions._id });

        return res.status(200).cookie('refreshToken', '', {domain: 'localhost', maxAge: 1, httpOnly: true});
    } catch (e) {
        return res.status(500).send("Что-то пошло не так");
    }
};
