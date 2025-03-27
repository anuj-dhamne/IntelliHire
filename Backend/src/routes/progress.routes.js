import { Router } from "express";
import {verifyJWT} from "../middleware/auth.middleware.js"
import { getDetailedProgressReport, getProgressOverview } from "../controller/progress.controller.js";

const progressRouter =Router();

progressRouter.get("/get-progress-overview",verifyJWT,getProgressOverview)
progressRouter.get("/get-detail-progress",verifyJWT,getDetailedProgressReport)

export default progressRouter;