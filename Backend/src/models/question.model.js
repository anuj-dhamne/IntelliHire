import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
      interview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
        required: true,
      },
      questionText: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        enum: ["technical", "behavioral", "situational"],
        required: true,
      },
      difficulty: {
        type: String,
        enum: ["easy", "medium", "hard"],
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Question = mongoose.model("Question", questionSchema);

  export default Question;