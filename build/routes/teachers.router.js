"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../utils");
const teachers_controller_1 = require("../controllers/teachers.controller");
const teacher_validators_1 = require("../validators/teacher.validators");
const router = express_1.Router();
router.get('/', teachers_controller_1.getAllTeachers);
router.get('/ids', teachers_controller_1.getTeachersByIds);
router.post('/add', teacher_validators_1.addTeacherValidators, utils_1.validation, teachers_controller_1.addTeacher);
router.delete('delete', teachers_controller_1.deleteTeacher);
exports.default = router;
