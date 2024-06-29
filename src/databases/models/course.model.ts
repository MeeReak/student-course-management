import mongoose, { Schema } from "mongoose";
import { ICourseSchema } from "../../types/course.types";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    professorName: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    Enroll: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Student",
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

const CourseModel = mongoose.model<ICourseSchema>("Course", courseSchema);

export default CourseModel;
