import APIError from "../../Errors/api-error";
import { StatusCode } from "../../utils/consts";
import { logger } from "../../utils/logger";
import CourseModel from "../models/course.model";
import {
  ICourse,
  ICourseFilter,
  ICourseQueryName,
  IUpdateCourse,
} from "../../types/course.types";

class CourseRepositories {
  async AddCourse({ info }: { info: ICourse }) {
    try {
      const course = await CourseModel.create(info);

      if (!course) {
        throw new APIError("Cannot create new course", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in AddCourse(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Creating Course", StatusCode.BadRequest);
    }
  }

  async getAllCourses() {
    try {
      const courses = await CourseModel.find({ isDelete: false });

      if (courses.length === 0) {
        throw new APIError("No course found", StatusCode.BadRequest);
      }

      return courses;
    } catch (error: unknown) {
      logger.error(
        `An error occurred in getReportss(): ${
          error instanceof Error ? error.message : error
        }`
      );

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error while getting all courses",
        StatusCode.BadRequest
      );
    }
  }


  async getReports() {
    try {
      const courses = await CourseModel.find({ isDelete: false });

      if (courses.length === 0) {
        throw new APIError("No course found", StatusCode.BadRequest);
      }

      const report = courses.map((course) => ({
        name: course.name,
        professor: course.professorName,
        startDate: course.startDate,
        endDate: course.endDate,
        studentLimit: course.limit,
        registeredStudents: course.Enroll.length,
      }));

      return report;
    } catch (error: unknown) {
      logger.error(
        `An error occurred in getReportss(): ${
          error instanceof Error ? error.message : error
        }`
      );

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error while getting all courses",
        StatusCode.BadRequest
      );
    }
  }

  async getCourseById(id: string) {
    try {
      const course = await CourseModel.findById(id);

      if (!course) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
      }

      if (course?.isDelete == true) {
        throw new APIError("Course not found", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in getCourseById(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error While Getting Couse By Id",
        StatusCode.BadRequest
      );
    }
  }

  async UpdateCourse({ id, info }: { id: string; info: IUpdateCourse }) {
    try {
      const course = await CourseModel.findByIdAndUpdate(id, info, {
        new: true,
      });

      if (!course) {
        throw new APIError("Cannot update course", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in UpdateCourse(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Updating Course", StatusCode.BadRequest);
    }
  }

  async deleteCousre(id: string) {
    try {
      const course = await this.getCourseById(id);

      if (!course) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
      }

      course.isDelete = true;
      await course.save();

      return course;
    } catch (error: unknown) {
      logger.error(`An error occurred in deleteCousre(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Delete Course", StatusCode.BadRequest);
    }
  }

  async findCourseByName(query: ICourseQueryName) {
    try {
      const course = await CourseModel.find(query ? query : {});

      if (course.length === 0) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in findCourseByName(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Searching Course", StatusCode.BadRequest);
    }
  }

  async findCourseFilter(query: ICourseFilter) {
    try {
      const course = await CourseModel.find(query ? query : {});

      if (course.length === 0) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in findCourseFilter(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Searching Course", StatusCode.BadRequest);
    }
  }
}

export default CourseRepositories;
