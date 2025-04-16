import axios from "axios";

const generateQuestions = async (jobDescription, position, level,quantity) => {
    try {
        const prompt = `Generate only ${quantity} ${level} level interview questions for the position of ${position} based on the following job description:\n\n${jobDescription}
        \n\nProvide questions categorized as "technical", "behavioral", or "situational". Also, specify their difficulty as "easy", "medium", or "hard". Return the result in JSON format as an array of objects with keys: questionText, category, and difficulty.`;

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

        let responseText = response.data.candidates[0].content.parts[0].text;

        
        // console.log("Raw Response from Gemini:", responseText);

        responseText = responseText.replace(/```json|```/g, "").trim(); 

        // console.log("New Response from Gemini:", responseText);

        return JSON.parse(responseText); // Parse JSON response from Gemini
    } catch (error) {
        console.error("Error generating AI questions:", error.message);
        return [];
    }
};

export default generateQuestions;
