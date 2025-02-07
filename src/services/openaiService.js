const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const FINETUNED_MODEL = 'your-fine-tuned-model-id'; // Replace with your fine-tuned model ID
const cache = new Map();

const getChatResponse = async (message) => {
  if (cache.has(message)) {
    return cache.get(message);
  }

  const maxRetries = 5;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: FINETUNED_MODEL, // Ensure this is replaced with your actual fine-tuned model ID
          prompt: message,
          max_tokens: 60,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      const result = response.data.choices[0].text.trim();
      cache.set(message, result); // Store response in cache
      return result;
    } catch (error) {
      if (error.response && error.response.status === 429) {
        attempt++;
        const retryAfter = error.response.headers['retry-after']
          ? parseInt(error.response.headers['retry-after'], 10) * 1000
          : Math.pow(2, attempt) * 1000; // exponential backoff
        console.warn(`Rate limit exceeded. Retrying in ${retryAfter / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter));
      } else if (error.response && error.response.status === 404) {
        console.error('Model not found or incorrect endpoint');
        throw new Error('Model not found or incorrect endpoint');
      } else {
        throw error;
      }
    }
  }

  throw new Error('Failed to get response from OpenAI after multiple attempts');
};

module.exports = { getChatResponse };