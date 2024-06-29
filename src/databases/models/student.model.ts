import mongoose, { Schema } from "mongoose";
import { IStudentSchema } from "../../types/student.types";

const studentSchema = new Schema(
  {
    name: {
      en: {
        type: String,
        required: true,
      },
      km: {
        type: String,
        required: true,
      },
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    Course: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
      },
    ],
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.__v;
      },
    },
  }
);

const StudentModel = mongoose.model<IStudentSchema>("Student", studentSchema);

export default StudentModel;
