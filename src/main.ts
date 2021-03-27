import "module-alias/register";
import "reflect-metadata";
import { loadLogger } from "./loader/LoggerLoader";
import Server from "./Server";

loadLogger();

const server = new Server();
server.start();
