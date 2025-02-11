import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';
import { loadTrainingData } from '../utils/trainingData';
import dotenv from 'dotenv';

dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function isQuestion(text: string): boolean {
    return /^(who|what|when|where|why|how|can|do|does|is|are|was|were)/i.test(text) || text.endsWith('?');
}

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const getRecruitmentResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }

        const trainingData = await loadTrainingData();
        const relevantExample = trainingData.find(data => data.prompt.toLowerCase().includes(prompt.toLowerCase()));

        if (relevantExample) {
            res.json({ response: relevantExample.completion });
            return;
        }

        const messages: Message[] = [
            {
                role: 'system',
                content: 'You are a friendly and helpful AI recruitment assistant. Provide clear and informative responses.'
            },
            { role: 'user', content: prompt }
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages,
            temperature: 0.7,
            max_tokens: 250,
        });

        const response = completion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a relevant response.";
        res.json({ response });
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};
