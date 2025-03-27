import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { getUserProfile, loginUser, userRegister } from "../controller/user.controller.js";

const userRouter=Router();

userRouter.post("/register",userRegister);

userRouter.post("/login",loginUser);

userRouter.get("/get-user-profile",verifyJWT,getUserProfile);

export default userRouter;