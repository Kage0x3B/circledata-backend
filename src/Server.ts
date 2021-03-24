import express, { Application, json, NextFunction, Request, Response, urlencoded } from "express";
import cors from "cors";
import config from "~config";
import NotFoundError from "~error/NotFoundError";
import RestError from "~error/RestError";
import IControllerBase from "~interface/IController";
import AuthController from "~controller/auth";
import helmet from "helmet";

export default class Server {
    private app: Application;

    constructor() {
        this.app = express();

        this.setupMiddleware();
        this.setupControllers();
        this.setupErrorHandling();
    }

    private setupControllers(): void {
        const controllerList: IControllerBase[] = [
            new AuthController()
        ];

        controllerList.forEach(controller => {
            controller.initRoutes();

            this.app.use(controller.path, controller.router);
        });
    }

    private setupMiddleware(): void {
        this.app.use(helmet());

        this.app.use(json({ limit: "10mb" }));
        this.app.use(urlencoded({ extended: false }));

        //TODO: Restrict to correct frontend url in production
        this.app.use(cors());
    }

    private setupErrorHandling(): void {
        this.app.all("*", () => {
            throw new NotFoundError("Request handler not found");
        });

        const ignoredErrors = [401];

        this.app.use((err: RestError | Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof RestError) {
                if (config.dev && !ignoredErrors.includes(err.statusCode)) {
                    console.warn(err);
                }

                res.status(err.statusCode).json(err.toResponse());
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message,
                    err: {
                        ...err,
                        statusCode: 500
                    }
                });
            }
        });
    }

    public start(): void {
        const hostname = config.hostname;
        const port = config.port;

        this.app.listen(port, hostname, () => {
            console.log(`Server listening on ${port}!`);
        });
    }
}
