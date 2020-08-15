import { check } from "express-validator";

export const regUserValidator = [
    check('firstName', 'Отсутсвует имя').exists(),
    check('lastName', 'Отсутсвует фамилия').exists(),
    check('email', 'Отсутсвует email').exists(),
    check('password', 'Отсутсвует пароль').exists(),
];

export const loginValidator = [
    check('email', 'Отсутсвует логин').exists(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({min: 6}),
];
