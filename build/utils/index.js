"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const express_validator_1 = require("express-validator");
exports.validation = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            errors: errors.array(),
            message: 'Вводные данные не коректны',
        });
    }
    else {
        next();
    }
};
