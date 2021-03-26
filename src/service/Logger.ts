import path from "path";
import winston, { LeveledLogMethod } from "winston";

export class Logger {
    public static DEFAULT_SCOPE = "app";
    private readonly scope: string;

    constructor(scope?: string) {
        this.scope = Logger.parsePathToScope((scope) ? scope : Logger.DEFAULT_SCOPE);
    }

    private static parsePathToScope(filepath: string): string {
        if (filepath.indexOf(path.sep) >= 0) {
            filepath = filepath.replace(process.cwd(), "");
            filepath = filepath.replace(`${path.sep}src${path.sep}`, "");
            filepath = filepath.replace(`${path.sep}dist${path.sep}`, "");
            filepath = filepath.replace(".ts", "");
            filepath = filepath.replace(".js", "");
            filepath = filepath.replace(path.sep, ":");
        }

        return filepath;
    }

    public debug(message: string, ...args: any[]): void {
        this.log(winston.debug, message, args);
    }

    public info(message: string, ...args: any[]): void {
        this.log(winston.info, message, args);
    }

    public warn(message: string, ...args: any[]): void {
        this.log(winston.warn, message, args);
    }

    public error(message: string, ...args: any[]): void {
        this.log(winston.error, message, args);
    }

    private log(loggerFunction: LeveledLogMethod, message: string, args: any[]): void {
        loggerFunction(`${this.formatScope()} ${message}`, args);
    }

    private formatScope(): string {
        return `[${this.scope}]`;
    }
}
