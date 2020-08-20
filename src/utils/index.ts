import {NextFunction, Request, Response,} from 'express';
import nodemailer from 'nodemailer';
import {validationResult} from 'express-validator';
require('dotenv').config();

export const validation = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array(),
            message: 'Вводные данные некорректны',
        });
    } else {
        next();
    }
};

export const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
