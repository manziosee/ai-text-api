import { Request, Response, NextFunction } from 'express';
import { OpenAI } from 'openai';
import { loadTrainingData } from '../utils/trainingData';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is missing');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function isQuestion(text: string): boolean {
    return (
        text.toLowerCase().startsWith('who') ||
        text.toLowerCase().startsWith('what') ||
        text.toLowerCase().startsWith('when') ||
        text.toLowerCase().startsWith('where') ||
        text.toLowerCase().startsWith('why') ||
        text.endsWith('?')
    );
}

interface Message {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const getRecruitmentResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { prompt } = req.body; // Remove userId

        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }

        const trainingData = await loadTrainingData();
        const relevantExample = trainingData.find(data =>
            data.prompt.toLowerCase().includes(prompt.toLowerCase())
        );

        if (relevantExample) {
            res.json({ response: relevantExample.completion });
            return;
        }

        if (isQuestion(prompt)) {
            const messages: Message[] = [
                {
                    role: "system",
                    content: `You are a friendly and helpful AI recruitment assistant.  When answering questions, provide clear, concise, and informative responses.  If you don't know the answer, say so politely. Aim to be helpful and conversational.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ];

            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 250,
            });

            const response = completion.choices[0].message?.content || "I'm sorry, I don't have the answer to that question.";
            res.json({ response });
            return;
        }

        const messages: Message[] = [
            {
                role: "system",
                content: `You are a friendly and helpful AI recruitment assistant. Your goal is to provide informative and engaging responses as if you are having a conversation.  When asked to describe a candidate, provide a brief and well-structured profile based on the requirements.
                    Emphasize skills, experience, and relevant accomplishments.  Respond in a conversational tone.  For example, instead of just outputting a profile, you might start with "Okay, here's a possible candidate profile:" or "I can help you with that!  Let me generate a profile for you."`
            },
            {
                role: "user",
                content: prompt
            }
        ];

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            max_tokens: 250,
        });

        const response = completion.choices[0].message?.content || "I'm sorry, I couldn't generate a relevant response.";
        res.json({ response });

    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
};