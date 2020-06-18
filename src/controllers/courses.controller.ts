import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { validation } from "../utils";
import Course from '../models/courses.model'
import {ICourse} from "../models/courses.interface";


export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const courses: ICourse[] = await Course.find();

        return res.status(200).send(courses);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const addCourse = async (req: Request, res: Response) => {
    validation('Данные не коректны', req, res);
    try {
        const { title, description, dateStart, dateFinish } = req.body;

        const dateS = new Date(dateStart);
        const dateF = new Date(dateFinish);

        const course: ICourse = new Course({
            title,
            description,
            dateStart: dateS,
            dateFinish: dateF,
        });

        const newCourse = await course.save();
        return res.status(200).send(newCourse);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    try{
        const { id } =  req.params;
        const payload  = req.query;

        const course = await Course.findOne({_id: id});
        if (!course) {
            return res.status(400).send('Курс не найден');
        }

        const newCourse = await Course.findOneAndUpdate({_id: id}, payload, {new: true});
        return res.status(200).send(newCourse);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    try{

        const { id } = req.params;
        const course = await Course.findOne({_id: id});

        if (!course) {
          return res.status(400).send('Курс не найден')
        }

        const delCourse = await Course.findOneAndDelete({_id: course._id});
        return res.status(200).send(`Курс ${delCourse} удален`);
    } catch (e) {
        return res.status(500).send('Что-то пошло не так');
    }
};
