import { StatusCodes } from "http-status-codes";
import { CustomApiError } from "./custom-api.js";

export class UnauthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
  s;
}
