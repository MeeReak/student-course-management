import { Document, Types } from "mongoose";

export interface IStudent {
  name: {
    en: string;
    km: string;
  };
  dateOfBirth: Date;
  gender: "Male" | "Female";
  phoneNumber: string;
}

export interface IUpdateStudent {
  name?: {
    en: string;
    km: string;
  };
  dateOfBirth?: Date;
  gender?: "Male" | "Female";
  phoneNumber?: string;
}

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
  query?: string;
}
