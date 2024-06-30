import { Request, Response, NextFunction } from "express";
import APIError from "src/Errors/api-error";
import studentSchema from "src/schemas/student.schema";
import { validateInput } from "../validate-input";

describe("validateInput middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Partial<Response>;
    next = jest.fn();
  });

  it("should pass validation with correct input", () => {
    req.body = {
      name: {
        en: "John Doe",
        km: "ដែន",
      },
      dateOfBirth: "1990-01-01",
      gender: "Male",
      phoneNumber: "123456789",
      isDelete: false,
    };

    validateInput(studentSchema)(req as Request, res as Response, next);

    expect(next).toBeCalled();
  });

  it("should handle validation errors with incorrect input", () => {
    req.body = {
      name: {
        en: "Kaizen", // Empty English name
        km: "",
      },
      dateOfBirth: "invalid-date", // Invalid date format
      gender: "Other", // Invalid gender
      phoneNumber: "", // Empty phone number
      isDelete: "true", // Incorrect type for boolean
      Course: ["invalidId"], // Invalid course ID format
    };

    validateInput(studentSchema)(req as Request, res as Response, next);

    expect(next).toBeCalledWith(expect.any(APIError)); // Assuming APIError is correctly thrown
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
  });
});
