import { Application } from "express";
import config from "~config";

import { createExpressServer, getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import SwaggerUi from "swagger-ui-express";
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import apiSpecInfo from "~util/apiSpecificationInfo";
import { Logger } from "./service/Logger";

export default class Server {
    private log = new Logger(__filename);

    private app: Application;

    constructor() {
        this.app = createExpressServer({
            // TODO: Restrict to correct frontend url in production
            cors: true,
            defaultErrorHandler: false,
            controllers: [__dirname + "/controller/*.ts"],
            middlewares: [__dirname + "/middleware/*.ts"],
            defaults: {
                paramOptions: {
                    required: true
                }
            }
        });

        this.setupSwaggerDocumentation();
    }

    public start(): void {
        const hostname = config.hostname;
        const port = config.port;

        this.app.listen(port, hostname, () => {
            this.log.info(`Server listening on ${hostname}:${port}!`);
        });
    }

    private setupSwaggerDocumentation(): void {
        const metadataStorage = getMetadataArgsStorage();
        const schemas = validationMetadatasToSchemas({
            refPointerPrefix: "#/components/schemas/"
        });
        const openApiSpec = routingControllersToSpec(metadataStorage, {}, {
            components: { schemas },
            info: apiSpecInfo
        });

        this.app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(openApiSpec));
    }
}
