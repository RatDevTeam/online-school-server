import { Request, Response } from 'express';
import Teacher from '../models/teachers.model';
import { ITeacher } from "../models/teachers.interface";

export const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const teacher = await Teacher.find();

        if (!teacher) {
            return res.status(400).send('Ни один преподователь не найден')
        }

        return res.status(200).send(teacher);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const getTeachersByIds = async (req: Request, res: Response) => {
    try {

        const idsString = req.header('ids');
        let ids: string[];
        if (idsString) {
            ids = idsString.split(',');
        } else {
            return res.status(400).send('Нет списка преподователей')
        }

        console.log(ids);

        const teachers: ITeacher[] = await Teacher.find();

        if (!teachers) {
            return res.status(400).send('Ни один преподователь не найден')
        }

        const teachersForCourse = teachers.filter((teacher) => ids.includes(String(teacher._id)));

        res.status(200).send(teachersForCourse);

    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
}

export const addTeacher = async (req: Request, res: Response) => {
    try {
        const { name, description, vkUrl } = req.body;

        const teacher: ITeacher = new Teacher({
            name, description, vkUrl
        });

        const newTeacher = await teacher.save();

        return res.status(200).send(newTeacher);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const deleteTeacher = async (req: Request, res: Response) => {
    try {

        const { id } = req.params;

        const teacher: ITeacher | null = await Teacher.findOne({_id: id});

        if (!teacher) {
            return res.status(400).send('Такого преподователя нет')
        }

        await Teacher.remove({_id: teacher._id});
        return res.status(200).send(`Преподователь ${teacher.name} удален`);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};
