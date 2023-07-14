"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateOneUser = exports.readOneUser = exports.readUser = exports.SignInAccount = exports.createUser = void 0;
const AuthModel_1 = __importDefault(require("../Model/AuthModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, avatar } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield AuthModel_1.default.create({
            userName, email, password: hash, avatar
        });
        return res.status(201).json({
            message: "Created Account",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Creating User",
        });
    }
});
exports.createUser = createUser;
const SignInAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield AuthModel_1.default.findOne({
            email
        });
        if (user) {
            const passed = yield bcrypt_1.default.compare(password, user.password);
            if (passed) {
                return res.status(201).json({
                    message: `Welcome back ${user.userName}`,
                    data: user._id
                });
            }
            else {
                return res.status(404).json({
                    message: "Password is incorrect",
                });
            }
        }
        else {
            return res.status(404).json({
                message: "User Not Found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Signing In",
        });
    }
});
exports.SignInAccount = SignInAccount;
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield AuthModel_1.default.find();
        return res.status(200).json({
            message: "Read User successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Reading User",
        });
    }
});
exports.readUser = readUser;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield AuthModel_1.default.findById(id);
        return res.status(200).json({
            message: "Read One User successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Reading One User",
        });
    }
});
exports.readOneUser = readOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userName, avatar } = req.body;
        const user = yield AuthModel_1.default.findByIdAndUpdate(id, {
            userName, avatar
        }, { new: true });
        return res.status(201).json({
            message: "Updating One User sucessfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Updating One User",
        });
    }
});
exports.updateOneUser = updateOneUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield AuthModel_1.default.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Deleted One User successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error Updating One User",
        });
    }
});
exports.deleteUser = deleteUser;
