const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();

const testAI = async () => {
  try {
    console.log("Testing with Key:", process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    console.log("Success:", response.text());
  } catch (error) {
    console.error("Test Failed:", error.message);
  }
};

testAI();
