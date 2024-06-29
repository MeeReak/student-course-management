import mongoose from "mongoose";
import CourseRepositories from "../databases/repositories/course.repositories";
import StudentRepositories from "../databases/repositories/student.repositories";
import APIError from "../Errors/api-error";
import {
  ICourse,
  ICourseFilter,
  ICourseQueryName,
  IUpdateCourse,
} from "../types/course.types";
import { StatusCode } from "../utils/consts";

class CourseService {
  studentRepo: StudentRepositories;
  courseRepo: CourseRepositories;

  constructor() {
    this.studentRepo = new StudentRepositories();
    this.courseRepo = new CourseRepositories();
  }

  async AddCourse({ info }: { info: ICourse }) {
    try {
      const course = await this.courseRepo.AddCourse({ info });
      return course;
    } catch (error: unknown | any) {
      throw new APIError("Cannot create new student", StatusCode.BadRequest);
    }
  }

  async getAllCourse() {
    try {
      const course = await this.courseRepo.getAllCourse();
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getCourseById(id: string) {
    try {
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const course = await this.courseRepo.getCourseById(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateCourse({ id, info }: { id: string; info: IUpdateCourse }) {
    try {
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const course = await this.courseRepo.UpdateCourse({ id, info });
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async deleteCourse(id: string) {
    try {
      const checkId = mongoose.Types.ObjectId.isValid(id);

      if (!checkId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }
      const course = await this.courseRepo.deleteCousre(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseByName(query: ICourseQueryName) {
    try {
      const { name, professorName } = query;

      const search: { [key: string]: any } = {};
      if (name) search.name = { $regex: name, $options: "i" }; // Case-insensitive partial match
      if (professorName)
        search.professorName = { $regex: professorName, $options: "i" };

      const allCourse = await this.courseRepo.findCourseByName(search);

      const course = allCourse.filter((course) => course.isDelete == false);

      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseFilter(query: ICourseFilter) {
    try {
      const { startDate, endDate } = query;

      const filter: { [key: string]: any } = {};

      if (startDate) filter.startDate = { $gte: startDate };
      if (endDate) filter.endDate = { $lte: endDate };

      const allCourse = await this.courseRepo.findCourseFilter(filter);

      const course = allCourse.filter((course) => course.isDelete == false);

      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default CourseService;
