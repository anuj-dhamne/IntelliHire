import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      interview: { type: mongoose.Schema.Types.ObjectId, ref: "Interview", required: true },
      aiFeedback: {
        communication: String,
        technicalSkills: String,
        problemSolving: String,
        confidence: String,
        overallPerformance: String,
        improvementSuggestions: [String],
      },
      overallScore: { type: Number, min: 0, max: 10, default: null },
    },
    { timestamps: true }
  );

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
