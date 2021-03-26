import { configure, format, transports } from "winston";
import config from "~config";

export const loadLogger = () => {
    configure({
        transports: [
            new transports.Console({
                level: "info",
                handleExceptions: true,
                format: !config.dev ? format.combine(format.json()) : format.combine(format.colorize(), format.simple())
            })
        ]
    });
};
