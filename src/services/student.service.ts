import mongoose from "mongoose";
import StudentRepositories from "../databases/repositories/student.repositories";
import APIError from "../Errors/api-error";
import { IQuery, IStudent, IUpdateStudent } from "../types/student.types";
import { StatusCode } from "../utils/consts";
import CourseRepositories from "../databases/repositories/course.repositories";

class StudentService {
  studentRepo: StudentRepositories;
  courseRepo: CourseRepositories;

  constructor() {
    this.studentRepo = new StudentRepositories();
    this.courseRepo = new CourseRepositories();
  }

  async AddStudent({ info }: { info: IStudent }) {
    try {
      const student = await this.studentRepo.AddStudent({ info });
      return student;
    } catch (error: unknown | any) {
      throw new APIError("Cannot create new student", StatusCode.BadRequest);
    }
  }

  async UpdateStudent({ id, info }: { id: string; info: IUpdateStudent }) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const student = await this.studentRepo.UpdateStudent({ id, info });
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getAllStudent() {
    try {
      const students = await this.studentRepo.getAllStudent();
      return students;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getReports() {
    try {
      const students = await this.studentRepo.getReports();
      return students;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getStudentById(id: string) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }
      const student = await this.studentRepo.getStudentById(id);

      return student;
    } catch (error: unknown | any) {
      if (error instanceof APIError) {
        throw error;
      }

      throw error;
    }
  }

  async findStudentByQuery(queries: IQuery) {
    try {
      const { query } = queries;
      const englishRegex = /^[a-zA-Z]+$/;
      const khmerRegex = /^[\u1780-\u17FF]+$/;
      const numberRegex = /^\d+$/;

      const search: { [key: string]: any } = {};

      if (!query) {
        throw new Error("Query is required");
      }

      if (englishRegex.test(query)) {
        search["name.en"] = { $regex: query, $options: "i" }; // Case-insensitive partial match
      } else if (khmerRegex.test(query)) {
        search["name.km"] = query;
      } else if (numberRegex.test(query)) {
        search.phoneNumber = query;
      } else {
        throw new Error("Query does not match any valid pattern");
      }

      const allStudents = await this.studentRepo.findStudentByQuery(search);

      // Filter out deleted students
      const students = allStudents.filter(
        (student: { isDelete: boolean }) => !student.isDelete
      );

      return students;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      // Provide a more specific error message
      throw new Error(`Failed to find students: ${(error as Error).message}`);
    }
  }

  async deleteStudent(id: string) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const student = await this.studentRepo.deleteStudent(id);
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  //todo Register Course
  //step 1 : find the student by id
  //step 2 : find the course by courseId
  //step 3 : check if the course is full or not
  //step 4 : check if the student already register the course or not
  //step 5 : add the student to the course and add the course to the student

  async registerCourse({ id, courseId }: { id: string; courseId: string }) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);
      const checkCourseId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId || !checkCourseId) {
        throw new APIError("Your id is Invalid", StatusCode.BadRequest);
      }

      const student = await this.studentRepo.getStudentById(id);

      const course = await this.courseRepo.getCourseById(courseId);

      if (course.Enroll.length >= course.limit) {
        throw new APIError(
          "Course you wanna Register is full",
          StatusCode.BadRequest
        );
      }

      if (course.Enroll.includes(student.id)) {
        throw new APIError(
          "You already register this course",
          StatusCode.BadRequest
        );
      }

      course.Enroll.push(student.id);
      await course.save(); //save the course after adding the student

      student.Course.push(course._id);
      await student.save(); //save the student after adding the course

      return student;
    } catch (error: unknown | any) {
      if (error instanceof APIError) {
        throw error;
      }
      throw error;
    }
  }

  //todo Remove Course
  //step 1 : find the student by id
  //step 2 : find the course by courseId
  //step 3 : check if the student already register the course or not
  //step 4 : remove the student from the course and remove the course from the student
  async removeCourse({ id, courseId }: { id: string; courseId: string }) {
    try {
      // Check if both IDs are valid
      const cheakId = mongoose.Types.ObjectId.isValid(id);
      const checkCourseId = mongoose.Types.ObjectId.isValid(courseId);

      if (!cheakId || !checkCourseId) {
        throw new APIError("Your id is Invalid", StatusCode.BadRequest);
      }

      const student = await this.studentRepo.getStudentById(id);

      const course = await this.courseRepo.getCourseById(courseId);

      // Check if the student is registered for the course
      if (!course.Enroll.includes(student.id)) {
        throw new APIError(
          "You are not registered for this course",
          StatusCode.BadRequest
        );
      }

      course.Enroll = course.Enroll.filter(
        (studentId) => studentId.toString() !== student.id.toString()
      );
      await course.save(); // Save the course after removing the student

      student.Course = student.Course.filter(
        (courseId) => courseId.toString() !== course._id.toString()
      );
      await student.save(); // Save the student after removing the course

      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default StudentService;
