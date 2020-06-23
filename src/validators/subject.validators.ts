import { check } from "express-validator";

export const addSubjectValidators = [
    check('title', 'Отсутсвует название').exists(),
    check('color', 'Отсутсвует цвет').exists(),
    check('type', 'Отсутсвует тип').exists()
];
