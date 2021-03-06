import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const defaultError = {
    StatusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };

  // Empty Field Error

  if (err.name === "ValidationError") {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg = Object.values(err.errors)
      .map((value) => value.message)
      .join(",");
  }

  //Duplicate field Error

  if (err.code && err.code === 11000) {
    defaultError.StatusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }

  res.status(defaultError.StatusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
