import z from "zod";
import mongoose from "mongoose";

export const courseSchema = z.object({
  name: z.string().nonempty({ message: "Course name is required" }),
  professorName: z.string().nonempty({ message: "Professor name is required" }),
  limit: z.number().positive({ message: "Limit must be a positive number" }),
  startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid start date format",
  }),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid end date format",
  }),
  isDelete: z.boolean().optional().default(false),
  Enroll: z.array(
    z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid student ID",
    })
  ).optional(),
});

