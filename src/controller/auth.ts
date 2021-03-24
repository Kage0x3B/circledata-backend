import IControllerBase from "~interface/IController";
import { Request, Response, Router } from "express";

export default class AuthController implements IControllerBase {
    public path = "/auth";
    public router = Router();

    public initRoutes(): void {
        this.router.post("/", AuthController.test);
    }

    private static test(req: Request, res: Response): void {
        res.json({ hello: "world" });
    }
}
