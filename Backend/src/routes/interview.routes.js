import { Router } from "express";
import {verifyJwt} from "../middleware/auth.middleware.js"
import { generateInterviewFeedback, getInterviewHistory, saveAnswer, startInterview } from "../controller/interview.controller";


const interviewRouter = Router();

interviewRouter.post("/start-interview",verifyJwt,startInterview);

interviewRouter.post("/save-answer",verifyJwt,saveAnswer);

interviewRouter.get("/get-feedback",verifyJwt,generateInterviewFeedback);

interviewRouter.get("/get-history",verifyJwt,getInterviewHistory)

export default interviewRouter;