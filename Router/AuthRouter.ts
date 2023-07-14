import { Router } from "express"
import { SignInAccount, createUser, deleteUser, readOneUser, readUser, updateOneUser } from "../Controller/AuthController";

const router: Router = Router();

router.route("/read").get(readUser);
router.route("/read/:id").get(readOneUser);
router.route("/create").post(createUser);
router.route("/sign-in").post(SignInAccount);
router.route("/update/:id").patch(updateOneUser);
router.route("/delete/:id").delete(deleteUser);

export default router;