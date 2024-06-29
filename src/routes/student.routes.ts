import express, { NextFunction, Request, Response } from "express";
import StudentController from "../controllers/student.controller";
import { StatusCode } from "../utils/consts";
import { validateInput } from "../middlewares/validate-input";
import studentSchema from "../schemas/student.schema";

const StudentRouter = express.Router();
const controller = new StudentController();

//create a new student
StudentRouter.post(
  "/",
  validateInput(studentSchema),
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const student = await controller.addStudent(_req.body);
      _res.status(StatusCode.Created).json({
        message: "Student created successfully",
        statusCode: StatusCode.Created,
        data: student,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//find the student by name or phoneNumber
StudentRouter.get(
  "/search",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const students = await controller.findStudentByQuery(_req.query);
      _res.status(StatusCode.OK).json({
        message: "Students Searched successfully",
        statusCode: StatusCode.OK,
        data: students,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//add and remove the course from the student
StudentRouter.post(
  "/:id/course/:courseId",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const { id, courseId } = _req.params;
      const student = await controller.registerCourse({ id, courseId });
      _res.status(StatusCode.Created).json({
        message: "Course added successfully",
        statusCode: StatusCode.Created,
        data: student,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

StudentRouter.delete(
  "/:id/course/:courseId",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const { id, courseId } = _req.params;
      const student = await controller.removeCourse({ id, courseId });
      _res.status(StatusCode.Created).json({
        message: "Course remove successfully",
        statusCode: StatusCode.Created,
        data: student,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//update the info of the student
StudentRouter.post(
  "/:id",
  validateInput(studentSchema),
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;
      const student = await controller.updateStudent(id, _req.body);
      _res.status(StatusCode.Created).json({
        message: "Student updated successfully",
        statusCode: StatusCode.Created,
        data: student,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//get all the student
StudentRouter.get(
  "/reports",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const students = await controller.getAllStudents();
      _res.status(StatusCode.OK).json({
        message: "Students Report fetched successfully",
        statusCode: StatusCode.OK,
        length: students.length,
        data: students,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//get the student by spicific id
StudentRouter.get(
  "/:id",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;

      const students = await controller.getStudentById(id);
      _res.status(StatusCode.OK).json({
        message: "Students fetched successfully",
        statusCode: StatusCode.OK,
        data: students,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//delete the student
StudentRouter.delete(
  "/:id",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;
      const student = await controller.deleteStudent(id);
      _res.status(StatusCode.Created).json({
        message: "Student deleted successfully",
        statusCode: StatusCode.Created,
        data: student,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

export default StudentRouter;
