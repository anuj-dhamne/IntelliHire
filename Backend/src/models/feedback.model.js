import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      interview: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
      },
      feedback:{
        type: mongoose.Schema.Types.Mixed,
      }
    },
    { timestamps: true }
  );

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
