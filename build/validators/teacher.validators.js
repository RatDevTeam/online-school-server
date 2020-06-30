"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTeacherValidators = void 0;
const express_validator_1 = require("express-validator");
exports.addTeacherValidators = [
    express_validator_1.check('name', 'Отсутсвует имя').exists(),
    express_validator_1.check('description', 'Отсутсвует описание').exists(),
    express_validator_1.check('vkUrl', 'Отсутсвует ссылка на вк').exists()
];
