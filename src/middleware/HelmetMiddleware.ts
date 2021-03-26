import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { NextFunction, Request, Response } from "express";
import helmet from "helmet";

@Middleware({ type: "before" })
export class HelmetMiddleware implements ExpressMiddlewareInterface {
    public use(req: Request, res: Response, next: NextFunction): any {
        return helmet()(req, res, next);
    }
}
