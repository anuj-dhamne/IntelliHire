import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node"
import { syncUser } from "./middlewares/syncuser.middleware.js"
const app= express();


app.use(cors({
    // origin:process.env.CORS_ORIGIN,
    // origin:"http://localhost:5173" ,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


// import user route 
import userRouter from "./routes/user.routes.js"
app.use("/api/v1/user",userRouter);

// import interview route 
import interviewRouter from "./routes/interview.routes.js"
app.use("/api/v1/interview",interviewRouter);

// import progress route 
import progressRouter from "./routes/progress.routes.js"
app.use("/api/v1/progress",progressRouter);




  export {app};