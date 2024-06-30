import { StatusCode } from "src/utils/consts";
import { SerializedErrorOutput } from "../@types/serialized-error-output";
import BaseCustomError from "../base-custom-error";
import NotFound from "../notFoundError";

describe("NotFound", () => {
  it("should correctly set message and statusCode", () => {
    const message = "Resource not found";
    const notFoundError = new NotFound(message);

    expect(notFoundError.message).toBe(message);
    expect(notFoundError.getStatusCode()).toBe(StatusCode.Conflict);
  });

  it("should return status code using getStatusCode method", () => {
    const message = "Resource not found";
    const notFoundError = new NotFound(message);

    expect(notFoundError.getStatusCode()).toBe(StatusCode.Conflict);
  });

  it("should serialize error message correctly", () => {
    const message = "Resource not found";
    const notFoundError = new NotFound(message);

    const serializedOutput: SerializedErrorOutput =
      notFoundError.serializeErrorOutput();
    expect(serializedOutput.errors).toEqual([{ message }]);
  });

  it("should inherit from BaseCustomError", () => {
    const message = "Resource not found";
    const notFoundError = new NotFound(message);

    expect(notFoundError).toBeInstanceOf(NotFound);
    expect(notFoundError).toBeInstanceOf(BaseCustomError);
    expect(notFoundError).toBeInstanceOf(Error);
  });

  it("should set prototype correctly", () => {
    const message = "Resource not found";
    const notFoundError = new NotFound(message);

    expect(Object.getPrototypeOf(notFoundError)).toBe(NotFound.prototype);
    expect(Object.getPrototypeOf(Object.getPrototypeOf(notFoundError))).toBe(
      BaseCustomError.prototype
    );
  });
});
