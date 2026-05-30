const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const listModels = async () => {
  try {
    const key = process.env.GEMINI_API_KEY;
    console.log("Testing Key:", key);
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    const response = await axios.get(url);
    console.log("Models:", JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error("Error Status:", error.response.status);
      console.error("Error Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
};

listModels();
