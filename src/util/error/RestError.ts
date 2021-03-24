import config from "../../config";

interface ErrorResponse {
    success: boolean,
    message: string,
    statusCode: number,
    stack?: string,
    cause?: Error
}

export default class RestError extends Error {
    statusCode: number;
    cause?: Error;

    constructor(message: string, statusCode = 500, cause?: Error) {
        super(message);

        Error.captureStackTrace(this, RestError);

        this.statusCode = statusCode;
        this.cause = cause;
    }

    toResponse(): ErrorResponse {
        return {
            success: false,
            message: this.message,
            statusCode: this.statusCode,
            stack: config.dev ? this.stack : undefined,
            cause: config.dev ? this.cause : undefined
        };
    }
}
