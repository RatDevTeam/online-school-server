import { Router } from 'express';
const router = Router();
import {getAllCourses, addCourse, updateCourse, deleteCourse} from '../controllers/courses.controller'
import {check} from "express-validator";
import {addCourseValidator} from "../validators/course.validators";

router.get('/all', getAllCourses );

router.post('/add',
    addCourseValidator,
    addCourse );

router.put('/update/:id', updateCourse);

router.delete('delete/:id', deleteCourse);

export default router;
