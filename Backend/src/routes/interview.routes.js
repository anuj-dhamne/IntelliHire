import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { generateInterviewFeedback, getInterviewHistory, saveAnswer, startInterview } from "../controller/interview.controller.js";


const interviewRouter = Router();

interviewRouter.post("/start-interview",verifyJWT,startInterview);

interviewRouter.post("/save-answer",verifyJWT,saveAnswer);

interviewRouter.get("/get-feedback",verifyJWT,generateInterviewFeedback);

interviewRouter.get("/get-history",verifyJWT,getInterviewHistory)

export default interviewRouter;