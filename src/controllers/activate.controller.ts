import {Request, Response} from "express";
import User from "../models/users.schema";
import { getActivatePage } from "../utils/pages";

export const userActivate = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(404).send('Такой пользователь не существует');
        }
        if (user.activated) {
            return res.status(404).send('Такой пользователь уже активирован');
        }

        await User.updateOne({ _id: user._id }, { activated: true });

        return res.status(200).send(getActivatePage(user.firstName));
    } catch (e) {
    return res.status(500).send("Что-то пошло не так");
    }
};
