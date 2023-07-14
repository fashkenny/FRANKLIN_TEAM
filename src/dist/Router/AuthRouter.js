"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../Controller/AuthController");
const router = (0, express_1.Router)();
router.route("/read").get(AuthController_1.readUser);
router.route("/read/:id").get(AuthController_1.readOneUser);
router.route("/create").post(AuthController_1.createUser);
router.route("/sign-in").post(AuthController_1.SignInAccount);
router.route("/update/:id").patch(AuthController_1.updateOneUser);
router.route("/delete/:id").delete(AuthController_1.deleteUser);
exports.default = router;
