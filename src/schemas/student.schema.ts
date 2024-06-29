import mongoose from "mongoose";
import z from "zod";

const studentSchema = z.object({
  name: z.object({
    en: z.string().nonempty({ message: "English name is required" }),
    km: z.string().nonempty({ message: "Khmer name is required" }),
  }),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  gender: z.enum(["Male", "Female"]),
  phoneNumber: z.string().nonempty({ message: "Phone number is required" }),
  isDelete: z.boolean().optional().default(false),
  Course: z.array(z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid course ID",
  })).optional(),
});

export default studentSchema;
