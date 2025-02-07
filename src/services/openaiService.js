const axios = require('axios');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getChatResponse = async (message, retries = 3, backoff = 1000) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response && error.response.status === 429 && retries > 0) {
      await delay(backoff); // Wait before retrying
      return getChatResponse(message, retries - 1, backoff * 2); // Retry with increased backoff
    }
    throw error;
  }
};

module.exports = { getChatResponse };