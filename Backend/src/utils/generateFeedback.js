import axios from "axios";

const generateFeedback = async (answers) => {
    try {
        const formattedAnswers = answers.map(a => `Q: ${a.question.questionText}\nA: ${a.answerText}`).join("\n\n");

        const prompt = `Provide structured and constructive feedback for the following interview responses:\n\n${formattedAnswers}
        \n\nEvaluate each answer based on clarity, relevance, and depth. Suggest improvements and give an overall rating (out of 5) for each answer.
        Return the feedback as a JSON object with keys: questionText, feedbackText, and rating (out of 5).`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        const responseText = response.data.candidates[0].content.parts[0].text;
        return JSON.parse(responseText); // Parse JSON response from Gemini
    } catch (error) {
        console.error("Error generating AI feedback:", error.message);
        return { error: "Failed to generate AI feedback." };
    }
};

export default generateFeedback;
