import express from "express";
import { errorHandler } from "./middlewares/error-handler";
import StudentRouter from "./routes/student.routes";
import CourseRouter from "./routes/course.routes";

//create express app
const app = express();

//get the data from body!
app.use(express.json());

app.use("/v1/students", StudentRouter);
app.use("/v1/courses", CourseRouter);

app.use(errorHandler);

export default app;
