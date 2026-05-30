const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Preference setting: 'openai' or 'gemini'
const AI_PROVIDER = process.env.AI_PROVIDER || 'openai'; 

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    // 1. Try OpenAI if selected and key exists
    if (AI_PROVIDER === 'openai' && process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.length > 10) {
      try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            { 
              role: "system", 
              content: "You are a helpful and friendly fitness coach for 'FitTrack'. Speak in very simple, easy-to-understand English. Avoid complex scientific terms. Give short and clear advice." 
            },
            { role: "user", content: message }
          ],
        });
        return res.status(200).json({ message: response.choices[0].message.content });
      } catch (openaiError) {
        console.error("OpenAI Error:", openaiError.message);
      }
    }

    // 2. Try Gemini as backup or primary
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 10) {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Use gemini-2.0-flash which seems to be the one working with the user's key
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(message);
        const response = await result.response;
        return res.status(200).json({ message: response.text() });
      } catch (geminiError) {
        console.error("Gemini Error:", geminiError.message);
      }
    }

    // 3. Final Fallback (If everything fails or keys are missing/rate limited)
    const fitnessFallbacks = [
      "System Recommendation: Focus on progressive overload. Increase your weight or reps by 5% every week to keep challenging your body.",
      "Nutrition Protocol: High protein intake (around 1.8g to 2g per kg of body weight) is essential for muscle repair and metabolic health.",
      "Recovery Logic: Ensure you get 7-8 hours of quality sleep. Most physiological optimization happens during deep sleep cycles.",
      "Hydration Strategy: Aim for 3-4 liters of water daily. Proper hydration is critical for neuromuscular efficiency and recovery.",
      "Performance Tip: Consistency is more important than perfection. Stick to your training schedule even on days when motivation is low."
    ];
    const randomTip = fitnessFallbacks[Math.floor(Math.random() * fitnessFallbacks.length)];
    res.status(200).json({ 
      message: `${randomTip} \n\n(Note: Command center is currently optimizing. Switching to local expert knowledge mode.)` 
    });

  } catch (error) {
    console.error("Critical AI Error:", error);
    res.status(500).json({ message: "Internal system error while processing AI intelligence." });
  }
};
