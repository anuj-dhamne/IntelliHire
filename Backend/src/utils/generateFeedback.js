import axios from "axios";

const generateFeedback = async (answers) => {
    try {
        const formattedAnswers = answers.map(a => `Q: ${a.question.questionText}\nA: ${a.answerText}`).join("\n\n");

        // const prompt = `Provide structured and constructive feedback for the following interview responses:\n\n${formattedAnswers}
        // \n\nEvaluate each answer based on clarity, relevance, and depth. Suggest improvements and give an overall rating (out of 5) for each answer.
        // Return the feedback as a JSON object with keys: questionText, feedbackText, and rating (out of 5).`;

        const prompt = `You are an AI interview evaluator. Analyze the following interview responses:\n\n${formattedAnswers}

Evaluate each answer based on clarity, relevance, and depth. For each answer:
- Assign marks out of 10
- Do not provide individual feedback

Then, write a **single, structured feedback** summarizing the candidate's overall performance, strengths, and areas for improvement.

Return the result strictly as a JSON object in the following format:

{
  "individualScores": [
    { "questionText": "Question 1 text", "marks": 8 },
    { "questionText": "Question 2 text", "marks": 6 },
    ...
  ],
  "averageMarks": 7.3,
  "overallFeedback": "Summarized feedback for the candidate's performance."
}`;


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

        // const responseText = response.data.candidates[0].content.parts[0].text;
        // return JSON.parse(responseText); // Parse JSON response from Gemini

        let responseText = response.data.candidates[0].content.parts[0].text;

        // Strip markdown code block if present
        if (responseText.startsWith("```json") || responseText.startsWith("```")) {
            responseText = responseText.replace(/```json|```/g, "").trim();
        }

        return JSON.parse(responseText);

    } catch (error) {
        console.error("Error generating AI feedback:", error.message);
        return { error: "Failed to generate AI feedback." };
    }
};

export default generateFeedback;
