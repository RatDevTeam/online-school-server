import { query } from "express-validator";

export const addCourseValidator = [
  query("title", "Отсутствует название курса").exists(),
  query("description", "Отсутствует описание курса").exists(),
  query("dateStart", "Отсутсвует дата начала курса").exists(),
  query("dateFinish", "Отсутствует дата окончания курса").exists(),
];
