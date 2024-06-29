import APIError from "../../Errors/api-error";
import { IQuery, IStudent, IUpdateStudent } from "../../types/student.types";
import { StatusCode } from "../../utils/consts";
import { logger } from "../../utils/logger";
import StudentModel from "../models/student.model";

class StudentRepositories {
  async AddStudent({ info }: { info: IStudent }) {
    try {
      const newStudent = await StudentModel.create(info);

      if (!newStudent) {
        throw new APIError("Cannot create new student", StatusCode.BadRequest);
      }

      return newStudent;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in AddStudent(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Creating Student", StatusCode.BadRequest);
    }
  }

  async UpdateStudent({ id, info }: { id: string; info: IUpdateStudent }) {
    try {
      const student = await StudentModel.findByIdAndUpdate(id, info, {
        new: true,
      });

      if (!student) {
        throw new APIError("Cannot update student", StatusCode.BadRequest);
      }

      return student;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in UpdateStudent(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Updating Student", StatusCode.BadRequest);
    }
  }

  async getAllStudents() {
    try {
      const students = await StudentModel.find();

      if (students.length === 0) {
        throw new APIError("No Student found", StatusCode.BadRequest);
      }

      const report = students.map((student) => {
        return {
          name: {
            english: student.name.en,
            khmer: student.name.km,
          },
          dateOfBirth: student.dateOfBirth,
          gender: student.gender,
          phoneNumber: student.phoneNumber,
          numberOfCourse: student.Course.length,
        };
      });

      return report;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in getAllStudents(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error While Getting All Students",
        StatusCode.BadRequest
      );
    }
  }

  async getStudentById(id: string) {
    try {
      const student = await StudentModel.findById(id);

      if (!student) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
      }

      if (student?.isDelete == true) {
        throw new APIError("Student not found", StatusCode.BadRequest);
      }

      return student;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in getStudentById(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        "Error While Getting Student By Id",
        StatusCode.BadRequest
      );
    }
  }

  async deleteStudent(id: string) {
    try {
      const student = await this.getStudentById(id);

      if (!student) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
      }

      student.isDelete = true;
      await student.save();

      return student;
    } catch (error: unknown) {
      logger.error(`An error occurred in deleteStudent(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Delete Student", StatusCode.BadRequest);
    }
  }

  async findStudentByQuery(query: IQuery) {
    try {
      const student = await StudentModel.find(query ? query : {});

      if (student.length === 0) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
      }

      return student;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in findStudentByQuery(): ${error}`);

      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError("Error While Query Student", StatusCode.BadRequest);
    }
  }
}

export default StudentRepositories;
