import { HttpError } from "routing-controllers";

export declare class ExtendedHttpError extends HttpError {
    errors: any[];

    constructor(httpCode: number, message?: string);
}
