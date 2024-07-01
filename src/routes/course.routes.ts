import express, { NextFunction, Request, Response } from "express";
import { StatusCode } from "../utils/consts";
import CourseController from "../controllers/course.controller";
import { validateInput } from "../middlewares/validate-input";
import { courseSchema } from "../schemas/course.schema";

const CourseRouter = express.Router();
const controller = new CourseController();

//get all course
CourseRouter.get(
  "/",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const course = await controller.getAllCourse();
      _res.status(StatusCode.OK).json({
        message: "All Course fetched successfully",
        statusCode: StatusCode.OK,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//create a new course
CourseRouter.post(
  "/",
  validateInput(courseSchema),
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const course = await controller.addCourse(_req.body);
      _res.status(StatusCode.Created).json({
        message: "Cousre created successfully",
        statusCode: StatusCode.Created,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//get all the course report
CourseRouter.get(
  "/reports",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const course = await controller.getReports();
      _res.status(StatusCode.OK).json({
        message: "Course Report fetched successfully",
        statusCode: StatusCode.OK,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//find the student by name or phoneNumber
CourseRouter.get(
  "/date",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const course = await controller.findCourseFilter(_req.query);
      _res.status(StatusCode.OK).json({
        message: "Course Searched successfully",
        statusCode: StatusCode.OK,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//find the student by name or phoneNumber
CourseRouter.get(
  "/search",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const course = await controller.findCourseByName(_req.query);
      _res.status(StatusCode.OK).json({
        message: "Course Searched successfully",
        statusCode: StatusCode.OK,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//get the course by spicific id
CourseRouter.get(
  "/:id",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;
      console.log("jo");
      const course = await controller.getCourseById(id);
      _res.status(StatusCode.OK).json({
        message: "Course fetched successfully",
        statusCode: StatusCode.OK,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//update the info of the course
CourseRouter.post(
  "/:id",
  validateInput(courseSchema),
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;
      const course = await controller.updateCourse(id, _req.body);
      _res.status(StatusCode.Created).json({
        message: "Course updated successfully",
        statusCode: StatusCode.Created,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

//delete the course
CourseRouter.delete(
  "/:id",
  async (_req: Request, _res: Response, _next: NextFunction) => {
    try {
      const id = _req.params.id;
      const course = await controller.deleteCourse(id);
      _res.status(StatusCode.Created).json({
        message: "Course deleted successfully",
        statusCode: StatusCode.Created,
        data: course,
      });
    } catch (error: unknown | any) {
      _next(error);
    }
  }
);

export default CourseRouter;
