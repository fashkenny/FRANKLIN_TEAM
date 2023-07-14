import { Request, Response } from "express"
import AuthModel from "../Model/AuthModel"
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
    try {
        const { userName, email, password, avatar } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await AuthModel.create({
            userName, email, password: hash, avatar
        })

        return res.status(201).json({
            message: "Created Account",
            data: user,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Creating User",
        })
    }
}

export const SignInAccount = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await AuthModel.findOne({
            email
        })
        if (user) {
            const passed = await bcrypt.compare(password, user.password);

            if (passed) {
                return res.status(201).json({
                    message: `Welcome back ${user.userName}`,
                    data: user._id
                })
            } else {
                return res.status(404).json({
                    message: "Password is incorrect",
                })
            }
        } else {
            return res.status(404).json({
                message: "User Not Found",
            })
        }
    } catch (error) {
        return res.status(404).json({
            message: "Error Signing In",
        })
    }
}

export const readUser = async (req: Request, res: Response) => {
    try {
        const user = await AuthModel.find();
        return res.status(200).json({
            message: "Read User successfully",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Reading User",
        })
    }
}

export const readOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await AuthModel.findById(id);
        return res.status(200).json({
            message: "Read One User successfully",
            data: user,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Reading One User",
        })
    }
}

export const updateOneUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { userName, avatar } = req.body;
        const user = await AuthModel.findByIdAndUpdate(id, {
            userName, avatar
        }, { new: true })

        return res.status(201).json({
            message: "Updating One User sucessfully",
            data: user,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Updating One User",
        })
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await AuthModel.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Deleted One User successfully",
            data: user,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error Updating One User",
        })
    }
} 