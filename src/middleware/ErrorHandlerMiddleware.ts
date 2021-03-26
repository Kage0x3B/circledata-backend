import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { Logger } from "../service/Logger";
import config from "~config";
import { ExtendedHttpError } from "../types/ExtendedHttpError";

@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
    private log = new Logger(__filename);

    error(error: ExtendedHttpError | HttpError | Error, req: Request, res: Response, next: NextFunction): void {
        res.status(error instanceof HttpError && error.httpCode ? error.httpCode : 500);
        res.json({
            name: error.name,
            message: error.message,
            errors: error instanceof ExtendedHttpError ? error.errors : []
        });

        if (config.dev) {
            this.log.error(error.name, error.stack);
        } else {
            this.log.error(error.name, error.message);
        }
    }
}
