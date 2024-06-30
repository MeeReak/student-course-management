import CourseService from "../services/course.service";
import {
  ICourse,
  ICourseFilter,
  ICourseQueryName,
  IUpdateCourse,
} from "../types/course.types";

class CourseController {
  courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  async addCourse(info: ICourse) {
    try {
      const course = await this.courseService.AddCourse({ info });
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getAllCourse() {
    try {
      const course = await this.courseService.getAllCourse();
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getCourseById(id: string) {
    try {
      const course = await this.courseService.getCourseById(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async updateCourse(id: string, info: IUpdateCourse) {
    try {
      const course = await this.courseService.UpdateCourse({ id, info });
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async deleteCourse(id: string) {
    try {
      const course = await this.courseService.deleteCourse(id);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseByName(query: ICourseQueryName) {
    try {
      const course = await this.courseService.findCourseByName(query);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findCourseFilter(query: ICourseFilter) {
    try {
      const course = await this.courseService.findCourseFilter(query);
      return course;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default CourseController;
