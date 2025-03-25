import { Router } from "express";
import {verifyJwt} from "../middleware/auth.middleware.js"
import { getUserProfile, loginUser, userRegister } from "../controller/user.controller";

const userRouter=Router();

userRouter.post("/register",userRegister);

userRegister.post("/login",loginUser);

userRouter.get("/get-user-profile",verifyJwt,getUserProfile);

export default userRouter;