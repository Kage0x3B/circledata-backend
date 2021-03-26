import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import { Logger } from "../service/Logger";
import morgan from "morgan";
import config from "~config";

@Middleware({ type: "before" })
export class LoggerMiddleware implements ExpressMiddlewareInterface {
    private log = new Logger(__dirname);

    use(req: Request, res: Response, next: NextFunction): void {
        return morgan(config.dev ? "dev" : "combined", {
            stream: {
                write: this.log.info.bind(this.log)
            }
        })(req, res, next);
    }
}
