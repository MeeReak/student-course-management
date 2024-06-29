import mongoose from "mongoose";
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

  async getAllCourse() {
    try {
      const course = await CourseModel.find();

      if (!course) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
      }

      return course;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in getAllCourse(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error While Getting All Course",
        StatusCode.BadRequest
      );
    }
  }

  async getCourseById(id: string) {
    try {
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const course = await CourseModel.findById(id);

      if (course?.isDelete == true) {
        throw new APIError("Course not found", StatusCode.BadRequest);
      }

      if (!course) {
        throw new APIError("Course not Found", StatusCode.BadRequest);
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
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

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
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

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
      const { name, professorName } = query;

      const search: { [key: string]: any } = {};
      if (name) search.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
      if (professorName)
        search.professorName = { $regex: professorName, $options: "i" };

      const allCourse = await CourseModel.find(search ? search : {});

      const course = allCourse.filter((course) => course.isDelete == false);

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
      const { startDate, endDate } = query;

      const filter: { [key: string]: any } = {};

      if (startDate) filter.startDate = { $gte: startDate };
      if (endDate) filter.endDate = { $lte: endDate };

      const allCourse = await CourseModel.find(filter ? filter : {});

      const course = allCourse.filter((course) => course.isDelete == false);

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
