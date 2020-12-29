import {Request, Response} from "express";
import User from "../models/user.schema";
import { getActivatePage } from "../utils/pages";
import {UserStatus} from "../models/user.interface";

export const userActivate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).send('Пользователя не существует');
        }
        if (user.status === UserStatus.ACTIVE) {
            return res.status(404).send('Пользователь уже активирован');
        }
        if (user.status === UserStatus.BLOCKED) {
            return res.status(404).send('Пользователь заблокирован');
        }

        await User.updateOne({ _id: user._id }, { activated: true });

        return res.status(200).send(getActivatePage(user.firstName));
    } catch (e) {
    return res.status(500).send("Что-то пошло не так");
    }
};
