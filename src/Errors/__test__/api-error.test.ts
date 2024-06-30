import APIError from "../api-error";
import { SerializedErrorOutput } from "../@types/serialized-error-output";
import { StatusCode } from "src/utils/consts";

describe("APIError", () => {
  it("should correctly set message and statusCode", () => {
    const message = "An error occurred";
    const statusCode = StatusCode.NotFound;
    const apiError = new APIError(message, statusCode);

    expect(apiError.message).toBe(message);
    expect(apiError.getStatusCode()).toBe(statusCode);
  });

  it("should use default statusCode if not provided", () => {
    const message = "An error occurred";
    const apiError = new APIError(message);

    expect(apiError.getStatusCode()).toBe(StatusCode.InternalServerError);
  });

  it("should serialize error message correctly when message is valid JSON", () => {
    const errorMessage = { error: "Invalid input" };
    const message = JSON.stringify(errorMessage);
    const apiError = new APIError(message);

    const serializedOutput: SerializedErrorOutput =
      apiError.serializeErrorOutput();
    expect(serializedOutput.errors).toEqual([errorMessage]);
  });

  it("should serialize error message correctly when message is not valid JSON", () => {
    const message = "An error occurred";
    const apiError = new APIError(message);

    const serializedOutput: SerializedErrorOutput =
      apiError.serializeErrorOutput();
    expect(serializedOutput.errors).toEqual([{ message }]);
  });
});
