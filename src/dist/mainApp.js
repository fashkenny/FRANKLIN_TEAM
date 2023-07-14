"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = __importDefault(require("./Router/AuthRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json()).use((0, cors_1.default)()).get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Awesome and good to go!!!!!"
            });
        }
        catch (error) {
            return res.status(404).json({
                message: "Error Found"
            });
        }
    }).use("/api/v2/auth", AuthRouter_1.default);
};
exports.mainApp = mainApp;
