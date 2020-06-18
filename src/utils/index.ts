import { Request, Response } from 'express';
import {validationResult} from 'express-validator';

export const validation = (title: string, req: Request, res: Response) => {
    const errors = validationResult(req);

    console.log(errors)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
            message: title,
        });
    }
};
