import express, { Application } from "express"
import dotenv from "dotenv"
import { mainApp } from "./mainApp";
import { dbConfig } from "./Config/db";
dotenv.config();

const app: Application = express();
const realPort = parseInt(process.env.APP_PORT!);
const port: number = realPort;

mainApp(app)
const server = app.listen(process.env.PORT || port, () => {
    dbConfig();
    console.log("Server is listening to port: ", port);
})

process.on("uncaughtException", (error: any) => {
    console.log("Server is shutting down because of uncaught exception: ", error);
    console.log("uncaught exception: ", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
    console.log("Server is shutting down because of unhandled rejection: ", reason);
    console.log("unhandled rejection: ", reason);
    server.close(() => {
        process.exit(1)
    })
})