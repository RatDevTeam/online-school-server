import { Router } from 'express';
const router = Router();
import {validation} from "../utils";
import {addCourseValidator} from "../validators/course.validators";
import {getAllCourses, addCourse, updateCourse, deleteCourse, getCourseById} from '../controllers/courses.controller'

/** /api/courses/ */
router.get('/', getAllCourses );

router.get('/:id', getCourseById);

router.post('/add',
    addCourseValidator,
    validation,
    addCourse );

router.put('/update/:id', updateCourse);

router.delete('delete/:id', deleteCourse);

export default router;
