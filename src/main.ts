import "module-alias/register";
import "reflect-metadata";
import Server from "./Server";
import { configure, format, transports } from "winston";
import config from "~config";
import { loadLogger } from "./loader/LoggerLoader";

loadLogger();

const server = new Server();
server.start();
