// import Progress from "../models/progress.model.js";
import Interview from "../models/interview.model.js";
import Feedback from "../models/feedback.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";

// Get Progress Overview
const getProgressOverview = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch the user's past interviews
        const interviews = await Interview.find({ user: userId }).sort({ createdAt: -1 });

        if (!interviews.length) {
            return res.status(404).json({ success: false, message: "No interview history found!" });
        }

        // Calculate total interviews and performance trend
        const totalInterviews = interviews.length;

        return res.status(200).json({
            success: true,
            message: "Progress overview fetched successfully!",
            data: { totalInterviews }
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching progress!", error: error.message });
    }
});

// Get Detailed Progress Report
const getDetailedProgressReport = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all feedback for user's interviews
        const feedbacks = await Feedback.find({ user: userId }).sort({ createdAt: -1 });

        if (!feedbacks.length) {
            return res.status(404).json({ success: false, message: "No feedback history found!" });
        }

        return res.status(200).json({
            success: true,
            message: "Detailed progress report fetched successfully!",
            feedbacks
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching detailed progress!", error: error.message });
    }
});

export { getProgressOverview, getDetailedProgressReport };
