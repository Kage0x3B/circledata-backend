import RestError from "./RestError";

export default class BadRequestError extends RestError {
    constructor(message = "Bad request", cause?: Error) {
        super(message, 400, cause);
    }
}
