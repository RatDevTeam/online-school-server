"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubjectValidators = void 0;
const express_validator_1 = require("express-validator");
exports.addSubjectValidators = [
    express_validator_1.check('title', 'Отсутсвует название').exists(),
    express_validator_1.check('color', 'Отсутсвует цвет').exists(),
    express_validator_1.check('type', 'Отсутсвует тип').exists()
];
