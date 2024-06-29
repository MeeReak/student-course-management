import StudentService from "../services/student.service";
import { IQuery, IStudent, IUpdateStudent } from "../types/student.types";

class StudentController {
  stuService: StudentService;

  constructor() {
    this.stuService = new StudentService();
  }

  async addStudent(info: IStudent) {
    try {
      const student = await this.stuService.AddStudent({ info });
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async updateStudent(id: string, info: IUpdateStudent) {
    try {
      const student = await this.stuService.UpdateStudent({ id, info });
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getAllStudents() {
    try {
      const students = await this.stuService.getAllStudents();
      return students;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async getStudentById(id: string) {
    try {
      const student = await this.stuService.getStudentById(id);
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async findStudentByQuery(query: IQuery) {
    try {
      const student = await this.stuService.findStudentByQuery(query);
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }

  async deleteStudent(id: string) {
    try {
      const student = await this.stuService.deleteStudent(id);
      return student;
    } catch (error: unknown | any) {
      throw error;
    }
  }
}

export default StudentController;
