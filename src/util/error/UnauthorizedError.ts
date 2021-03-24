import RestError from "./RestError";

export default class UnauthorizedError extends RestError {
    constructor(message = "Unauthorized", cause?: Error) {
        super(message, 401, cause);
    }
}
