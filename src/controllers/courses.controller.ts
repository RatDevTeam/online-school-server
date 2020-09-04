import { Request, Response } from "express";
import Course from "../models/courses.model";
import { ICourse } from "../models/courses.interface";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses: ICourse[] = await Course.find();

    return res.status(200).send(courses);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const course: ICourse[] = await Course.find({ _id: id });

    if (!course) {
      return res.status(400).send("Курс не найден");
    }
    return res.status(200).send(course);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};

export const addCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, dateStart, dateFinish, subject } = req.query;
    const imageUrl = <string>res.locals.publicUrl;

    const dateS = new Date(dateStart as string);
    const dateF = new Date(dateFinish as string);

    const course: ICourse = new Course({
      title,
      description,
      dateStart: dateS,
      dateFinish: dateF,
      subject,
      imageUrl,
    });

    const newCourse = await course.save();
    return res.status(200).send(newCourse);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.query;

    const course = await Course.findOne({ _id: id });
    if (!course) {
      return res.status(400).send("Курс не найден");
    }

    const newCourse = await Course.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return res.status(200).send(newCourse);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const course = await Course.findOne({ _id: id });

    if (!course) {
      return res.status(400).send("Курс не найден");
    }

    await Course.remove({ _id: course._id });
    return res.status(200).send(`Курс ${course.title} удален`);
  } catch (e) {
    return res.status(500).send("Что-то пошло не так");
  }
};
