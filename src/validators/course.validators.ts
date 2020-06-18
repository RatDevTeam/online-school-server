import { check } from "express-validator";

export const addCourseValidator = [
    check('title', "Отсутствует название курса").exists(),
    check('description', "Отсутствует описание курса").exists(),
    check('dateStart', "Отсутсвует дата начала курса").exists(),
    check('dateFinish', "Отсутствует дата окончания курса").exists(),
];
