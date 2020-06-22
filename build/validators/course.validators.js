"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCourseValidator = void 0;
const express_validator_1 = require("express-validator");
exports.addCourseValidator = [
    express_validator_1.check('title', "Отсутствует название курса").exists(),
    express_validator_1.check('description', "Отсутствует описание курса").exists(),
    express_validator_1.check('dateStart', "Отсутсвует дата начала курса").exists(),
    express_validator_1.check('dateFinish', "Отсутствует дата окончания курса").exists(),
];
