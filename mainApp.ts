import express, { Application, Request, Response } from "express"
import cors from "cors"
import auth from "./Router/AuthRouter";

export const mainApp = (app: Application) => {
    app.use(express.json()).use(cors()).get("/", (req: Request, res: Response) => {
        try {
            return res.status(200).json({
                message: "Awesome and good to go!!!!!"
            })
        } catch (error) {
            return res.status(404).json({
                message: "Error Found"
            })
        }
    }).use("/api/v2/auth", auth)
}