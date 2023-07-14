"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainApp_1 = require("./mainApp");
const db_1 = require("./Config/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
const realPort = parseInt(process.env.APP_PORT);
const port = realPort;
(0, mainApp_1.mainApp)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, db_1.dbConfig)();
    console.log("Server is listening to port: ", port);
});
process.on("uncaughtException", (error) => {
    console.log("Server is shutting down because of uncaught exception: ", error);
    console.log("uncaught exception: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("Server is shutting down because of unhandled rejection: ", reason);
    console.log("unhandled rejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
