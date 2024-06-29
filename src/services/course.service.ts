import CourseRepositories from "../databases/repositories/course.repositories";
import StudentRepositories from "../databases/repositories/student.repositories";
import APIError from "../Errors/api-error";
import {
  ICourse,
  ICourseFilter,
  ICourseQueryName,
  IUpdateCourse,
} from "../types/course.types";
import { IQuery, IStudent, IUpdateStudent } from "../types/student.types";
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
      const course = await this.courseRepo.getCourseById(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async UpdateCourse({ id, info }: { id: string; info: IUpdateCourse }) {
    try {
      const course = await this.courseRepo.UpdateCourse({ id, info });
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async deleteCourse(id: string) {
    try {
      const course = await this.courseRepo.deleteCousre(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseByName(query: ICourseQueryName) {
    try {
      const course = await this.courseRepo.findCourseByName(query);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseFilter(query: ICourseFilter) {
    try {
      const course = await this.courseRepo.findCourseFilter(query);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default CourseService;
