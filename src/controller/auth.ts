import { Request, Response, Router } from "express";
import IControllerBase from "~interface/IController";

export default class AuthController implements IControllerBase {
    public path = "/auth";
    public router = Router();

    private static test(req: Request, res: Response): void {
        res.json({ hello: "world" });
    }

    public initRoutes(): void {
        this.router.post("/", AuthController.test);
    }
}
