import axios from "axios";

const generateFeedback = async (answers) => {
    try {
        const formattedAnswers = answers.map(a => `Q: ${a.question.questionText}\nA: ${a.answerText}`).join("\n\n");

//         const prompt = `You are an AI interview evaluator. Analyze the following interview responses:\n\n${formattedAnswers}

// Evaluate each answer based on clarity, relevance, and depth. For each answer:
// - Assign marks out of 10
// - Do not provide individual feedback

// Then, write a **single, structured feedback** summarizing the candidate's overall performance, strengths, and areas for improvement.

// Return the result strictly as a JSON object in the following format:

// {
//   "individualScores": [
//     { "questionText": "Question 1 text", "marks": 8 },
//     { "questionText": "Question 2 text", "marks": 6 },
//     ...
//   ],
//   "averageMarks": 7.3,
//   "overallFeedback": "Summarized feedback for the candidate's performance."
// }`;

const prompt = `You are an AI interview evaluator. Analyze the following interview responses:

${formattedAnswers}

Evaluate each answer based on clarity, relevance, and depth. For each answer:
- Assign marks out of 10
- Do NOT provide individual feedback

Then, write a **single, well-structured feedback** summarizing the candidate's overall performance, strengths, and areas for improvement.

After the evaluation, recommend improvement resources based on weak areas. For this:

🔗 Website Links:
- Provide exactly **2 reliable and accessible website links** related to the weak areas identified (e.g., from GeeksforGeeks, freeCodeCamp, MDN, W3Schools, etc.).
- The links **must be live, active, and directly related** to the specific topic.
- ⚠️ Avoid generic homepage links (like "https://geeksforgeeks.org"). Each link should go to a specific article or topic page.
- Only return working URLs from trusted sources — do NOT make up or guess links.

🎥 YouTube Video:
- Provide **1 working YouTube video link** that clearly explains a weak topic.
- ✅ The video must be **publicly available**, **not broken**, and must **exist on YouTube** at the time of generation.
- ✅ Do NOT make up or hallucinate YouTube URLs — only return an actual, valid YouTube link that exists.
- ✅ You must simulate a real YouTube or Google search and choose the top, most relevant result.
- ⚠️ Do NOT return placeholder or unavailable videos. Verify that the link is accessible and related to the topic.
- ✅ If no reliable link is found, provide the **title and channel name** of a real video and a search keyword (like: "JavaScript closures tutorial site:youtube.com").

Return the output strictly in the following JSON format:

{
  "individualScores": [
    { "questionText": "Question 1 text", "marks": 8 },
    { "questionText": "Question 2 text", "marks": 6 }
  ],
  "averageMarks": 7.3,
  "overallFeedback": "Summarized feedback for the candidate's performance.",
  "resources": {
    "websites": [
      "https://example.com/article-on-topic-1",
      "https://example.com/article-on-topic-2"
    ],
    "youtube": "https://youtube.com/actual-working-video-link"
  }
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
