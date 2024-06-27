import { Document, Types } from "mongoose";

export interface IStudentSchema extends Document {
  name: {
    en: string;
    km: string;
  };
  dateOfBirth: Date;
  gender: "Male" | "Female";
  phoneNumber: string;
  isDelete: boolean;
  Course: Types.ObjectId[];
}

export interface IQuery {
  en?: string;
  km?: string;
  phoneNumber?: string;
}
