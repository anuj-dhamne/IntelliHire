import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    totalInterviews: { type: Number, default: 0 },
    bestScore: { type: Number, min: 0, max: 10, default: null },
    averageScore: { type: Number, min: 0, max: 10, default: null },
    improvementAreas: [String], // AI-identified weak points
    lastInterviewDate: { type: Date },
  },
  { timestamps: true }
);

const Progress = mongoose.model("Progress", progressSchema);

export default Progress;