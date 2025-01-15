import axios from "axios";

const API_URL = "http://localhost:5000/ask-question";  // Backend URL

// Function to send the question and API key to the backend
export const askQuestion = async (question, apiKey) => {
  try {
    const response = await axios.post(API_URL, {
      question: question,
      groq_api_key: apiKey,
    });
    return response.data.response;
  } catch (error) {
    console.error("Error calling the API:", error);
    throw error;
  }
};
