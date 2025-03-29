import mongoose from "mongoose";
const interviewSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    position: {
        type: String,
        // required: true,
      },
      jobDescription: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        // required: true,
      },
      status: {
        type: String,
        enum: ["ongoing", "completed"],
        default: "ongoing",
      },
      startedAt: {
        type: Date,
        default: Date.now,
      },
      completedAt: {
        type: Date,
      },
    
},{timestamps:true});

const Interview =mongoose.model("Interview",interviewSchema);
export default Interview;