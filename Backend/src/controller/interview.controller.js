import Interview from "../models/interview.model.js";
import Question from "../models/question.model.js";
import Answer from "../models/answer.model.js";
import Feedback from "../models/feedback.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import generateQuestions from "../utils/generateQuestions.js"; 
import generateFeedback from "../utils/generateFeedback.js"; 


const startInterview = asyncHandler(async (req, res) => {
    try {
        const { jobDescription, position, level } = req.body;
        const userId = req.user._id;
        console.log("user id : ",userId);
        // Generate AI-based interview questions
        const questionsData = await generateQuestions(jobDescription, position, level);

        // console.log(" qs by ai : ",questionsData);
        // Create a new interview session
        const newInterview = await Interview.create({
            user: userId,
            jobDescription,
            position,
            level,
        });
        
        console.log("Interview id ",newInterview._id);
        // Save questions linked to this interview
        const questions = await Question.insertMany(
            questionsData.map(q => ({
                interview: newInterview._id,
                questionText: q.questionText,
                category: q.category,
                difficulty: q.difficulty
            }))
        );

        // console.log("Quetion : ",questions);

        return res.status(201).json({
            success: true,
            message: "Interview started successfully!",
            interviewId: newInterview._id,
            questions
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error starting interview!", error: error.message });
    }
});

const saveAnswer = asyncHandler(async (req, res) => {
    
    try {
        const { interviewId, questionId, answerText } = req.body;
        console.log("you r in save answer function ! ",answerText);
        const userId = req.user._id;

        // Check if the interview and question exist
        const interview = await Interview.findOne({ _id: interviewId, user: userId });
        console.log("Found interview in db : ",interview);
        if (!interview) {
            return res.status(404).json({ success: false, message: "Interview not found!" });
        }

        const question = await Question.findOne({ _id: questionId, interview: interviewId });
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found!" });
        }
        console.log("Found the quetion in the Db : ",question);
        // Save the answer
        const newAnswer = new Answer({
            question: questionId,
            user: userId,
            answerText,
            interview
        });
        await newAnswer.save();

        console.log("the stored answer in DB : ",newAnswer);
        

        return res.status(201).json({
            success: true,
            message: "Answer saved successfully!",
            answer: newAnswer
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error saving answer!", error: error.message });
    }
});

const generateInterviewFeedback = asyncHandler(async (req, res) => {
    try {
        const { interviewId } = req.body;
        const userId = req.user._id;
        console.log("Interview ID:", interviewId);
        console.log("User ID:", userId);
        

        // Fetch only the answers for the given interview and user
        // const answers = await Answer.find({ interview: interviewId, user: userId })
        //     .populate("question", "questionText category difficulty");

            const answers = await Answer.find({
                interview: new mongoose.Types.ObjectId(interviewId),
                user:userId,
              }).populate("question", "questionText category difficulty");
              if (!answers.length) {
                console.log("⚠️ No answers found in DB for this interview and user");
                return res.status(404).json({ success: false, message: "No answers found for this interview!" });
            }
            
            console.log("The answer list send to backend : ",answers)
        if (!answers.length) {
            return res.status(404).json({ success: false, message: "No answers found for this interview!" });
        }

        // Generate AI feedback
        const feedbackData = await generateFeedback(interviewId); // Now correctly passing interviewId
        console.log("The genrated Feedback :",feedbackData);
        // Store feedback in the database
        const feedback = new Feedback({
            user: userId,
            interview: interviewId,
            feedback: feedbackData
        });
        await feedback.save();

        return res.status(201).json({
            success: true,
            message: "Feedback generated successfully!",
            feedback
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error generating feedback!", error: error.message });
    }
});

const getInterviewHistory = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const interviews = await Interview.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Interview history fetched successfully!",
            interviews
        });

    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching interview history!", error: error.message });
    }
});

export { startInterview, saveAnswer, generateInterviewFeedback, getInterviewHistory };
