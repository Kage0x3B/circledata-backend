import RestError from "./RestError";

export default class ForbiddenError extends RestError {
    constructor(message = "Forbidden", cause?: Error) {
        super(message, 403, cause);
    }
}
