import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';
import { loadTrainingData } from '../utils/trainingData';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Check if API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is missing');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getRecruitmentResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt is required' });
      return;
    }

    // Load training data
    const trainingData = await loadTrainingData();

    // Find the most relevant training example
    const relevantExample = trainingData.find(data => 
      data.prompt.toLowerCase().includes(prompt.toLowerCase())
    );

    if (relevantExample) {
      // If we have a direct match in our training data, use it
      res.json({ response: relevantExample.completion });
      return;
    }

    // If no direct match, use OpenAI to generate a response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a recruitment assistant. Provide detailed professional profiles based on the requirements given."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};