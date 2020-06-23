import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Subject from '../models/subject.model';
import {ISubject} from "../models/subject.interface";

export const getAllSubject = async (req: Request, res: Response) => {
    try {
        const subject = await Subject.find();

        if (!subject) {
          return res.status(400).send('Ни один придмет не найден')
        }

        return res.status(200).send(subject);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const addSubject = async (req: Request, res: Response) => {
    try {
        const { title, color, type } = req.body;

        const subjects = await Subject.find();

        const equal: ISubject | undefined = subjects.find(subject => (subject.title === title || subject.color === color || subject.type === type));

        if (equal) {
            let text: string[] = [];
            if (equal.color === color) {
                text.push('Предмет с таким цветом уже есть');
            }
            if (equal.title === title) {
                text.push('Предмет с таким именем уже есть');
            }
            if (equal.type === type) {
                text.push('Предмет с таким типом уже есть')
            }
            return res.status(400).send(text)
        }

        const subject: ISubject = new Subject(req.body);

        const newSubject = await subject.save();

        return res.status(200).send(newSubject);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const deleteSubject = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const subject: ISubject | null = await Subject.findOne({_id: id});

        if (!subject) {
            return res.status(400).send('Предмет отсутствует')
        }

        await Subject.remove({_id: subject._id});
        return res.status(200).send(`Предмет ${subject.title} удален`);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};
