import { Types } from "mongoose";

export interface ICourseSchema extends Document {
  name: string;
  professorName: string;
  limit: number;
  startDate: Date;
  endDate: Date;
  isDelete?: boolean;
  Enroll: Types.ObjectId[];
}

export interface ICourse {
  name: string;
  professorName: string;
  startDate: Date;
  endDate: Date;
  limit: number;
}

export interface IUpdateCourse {
  name: string;
  professorName: string;
  startDate: Date;
  endDate: Date;
  limit: number;
}

export interface ICourseQueryName {
  name?: string;
  professorName?: string;
}

export interface ICourseFilter {
  startDate?: Date;
  endDate?: Date;
}
