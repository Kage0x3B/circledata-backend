import RestError from "./RestError";

export default class NotFoundError extends RestError {
    constructor(message = "Not found", cause?: Error) {
        super(message, 404, cause);
    }
}
