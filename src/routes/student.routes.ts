import express, { NextFunction, Request, Response } from "express";
import StudentController from "../controllers/student.controller";
import { StatusCode } from "../utils/consts";

const StudentRouter = express.Router();
const controller = new StudentController();

StudentRouter.post(
  "/",
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

StudentRouter.post(
  "/:id",
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

StudentRouter.get(
  "/",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const students = await controller.getAllStudents();
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

export default StudentRouter;
