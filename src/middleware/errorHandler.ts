import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors";
import Logger from "../logger";
import { Response,Request, NextFunction} from "express";


export const errorHandlerMiddleware = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err instanceof CustomError) {
      Logger.error(err.serializeErrors());
      return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }

    // Other uncaught errors
   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors: [{ message: err.message }],
   });
}