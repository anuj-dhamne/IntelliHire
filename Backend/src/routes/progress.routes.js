import { Router } from "express";
import {verifyJwt} from "../middleware/auth.middleware.js"
import { getDetailedProgressReport, getProgressOverview } from "../controller/progress.controller.js";

const progressRouter =Router();

progressRouter.get("/get-progress-overview",verifyJwt,getProgressOverview)
progressRouter.get("/get-detail-progress",verifyJwt,getDetailedProgressReport)

export default progressRouter;