import mongoose from "mongoose";
import APIError from "../../Errors/api-error";
import { IStudent, IUpdateStudent } from "../../types/student.types";
import { StatusCode } from "../../utils/consts";
import { logger } from "../../utils/logger";
import StudentModel from "../models/student.model";
import { IQuery } from "../types/student.type";

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

      throw new APIError("Error While Creating Student", StatusCode.BadRequest);
    }
  }

  async UpdateStudent({ id, info }: { id: string; info: IUpdateStudent }) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const student = await StudentModel.findByIdAndUpdate(id, info, {
        new: true,
      });

      if (!student) {
        throw new APIError("Cannot update student", StatusCode.BadRequest);
      }

      return student;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in UpdateStudent(): ${error}`);

      throw new APIError("Error While Updating Student", StatusCode.BadRequest);
    }
  }

  async getAllStudents() {
    try {
      const students = await StudentModel.find();

      if (!students) {
        throw new APIError("Cannot find students", StatusCode.BadRequest);
      }

      return students;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in getAllStudents(): ${error}`);

      throw new APIError(
        "Error While Getting All Students",
        StatusCode.BadRequest
      );
    }
  }

  async getStudentById(id: string) {
    try {
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

      const student = await StudentModel.findById(id);

      if (student?.isDelete == true) {
        throw new APIError("Student not found", StatusCode.BadRequest);
      }

      if (!student) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
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
      const cheakId = mongoose.Types.ObjectId.isValid(id);

      if (!cheakId) {
        throw new APIError("Invalid Id", StatusCode.BadRequest);
      }

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
      console.log(query);

      const { km, en, phoneNumber } = query;

      const search: { [key: string]: any } = {};
      if (en) search["name.en"] = { $regex: en, $options: "i" }; // Case-insensitive partial match
      if (km) search["name.km"] = km;
      if (phoneNumber) search.phoneNumber = phoneNumber;

      const allStudent = await StudentModel.find(search ? search : {});

      const student = allStudent.filter((student) => student.isDelete == false);

      if (student.length === 0) {
        throw new APIError("Cannot find student", StatusCode.BadRequest);
      }

      return student;
    } catch (error: unknown | any) {
      logger.error(`An error occurred in findStudentByQuery(): ${error}`);

      throw new APIError("Error While Query Student", StatusCode.BadRequest);
    }
  }
}

export default StudentRepositories;
