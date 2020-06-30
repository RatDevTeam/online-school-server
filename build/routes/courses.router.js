"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const courses_controller_1 = require("../controllers/courses.controller");
const course_validators_1 = require("../validators/course.validators");
/** /api/courses/ */
router.get('/', courses_controller_1.getAllCourses);
router.get('/:id', courses_controller_1.getCourseById);
router.post('/add', course_validators_1.addCourseValidator, courses_controller_1.addCourse);
router.put('/update/:id', courses_controller_1.updateCourse);
router.delete('delete/:id', courses_controller_1.deleteCourse);
exports.default = router;
