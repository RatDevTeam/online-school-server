import { Router } from "express";
const router = Router();
import { validation } from "../utils";
import { addCourseValidator } from "../validators/course.validators";
import {
  getAllCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
} from "../controllers/courses.controller";
import { uploadMulter, uploadPhotos } from "../controllers/upload.constroller";

/** /api/courses/ */
router.get("/", getAllCourses);

router.get("/:id", getCourseById);

router.post(
  "/add",
  uploadMulter.single("image"),
  uploadPhotos,
  addCourseValidator,
  validation,
  addCourse
);

router.put(
    "/update/:id",
    uploadMulter.single("image"),
    uploadPhotos,
    updateCourse);

router.delete("delete/:id", deleteCourse);

export default router;
