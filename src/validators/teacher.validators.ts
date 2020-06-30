import { check } from "express-validator";

export const addTeacherValidators = [
    check('name', 'Отсутсвует имя').exists(),
    check('description', 'Отсутсвует описание').exists(),
    check('vkUrl', 'Отсутсвует ссылка на вк').exists()
];
