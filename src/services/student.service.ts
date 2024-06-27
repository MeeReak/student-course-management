import StudentRepositories from "../databases/repositories/student.repositories";
import { IQuery } from "../databases/types/student.type";
import APIError from "../Errors/api-error";
import { IStudent, IUpdateStudent } from "../types/student.types";
import { StatusCode } from "../utils/consts";

class StudentService {
  studentRepo: StudentRepositories;

  constructor() {
    this.studentRepo = new StudentRepositories();
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
      const student = await this.studentRepo.UpdateStudent({ id, info });
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getAllStudents() {
    try {
      const students = await this.studentRepo.getAllStudents();
      return students;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getStudentById(id: string) {
    try {
      const student = await this.studentRepo.getStudentById(id);
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  

  async findStudentByQuery(query: IQuery) {
    try {
      const student = await this.studentRepo.findStudentByQuery(query)
      return student
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default StudentService;
