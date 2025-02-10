"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecruitmentResponse = void 0;
const openai_1 = require("openai");
const trainingData_1 = require("../utils/trainingData");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is missing');
}
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
function isQuestion(text) {
    return (text.toLowerCase().startsWith('who') ||
        text.toLowerCase().startsWith('what') ||
        text.toLowerCase().startsWith('when') ||
        text.toLowerCase().startsWith('where') ||
        text.toLowerCase().startsWith('why') ||
        text.endsWith('?'));
}
const getRecruitmentResponse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { prompt } = req.body; // Remove userId
        if (!prompt) {
            res.status(400).json({ error: 'Prompt is required' });
            return;
        }
        const trainingData = yield (0, trainingData_1.loadTrainingData)();
        const relevantExample = trainingData.find(data => data.prompt.toLowerCase().includes(prompt.toLowerCase()));
        if (relevantExample) {
            res.json({ response: relevantExample.completion });
            return;
        }
        if (isQuestion(prompt)) {
            const messages = [
                {
                    role: "system",
                    content: `You are a friendly and helpful AI recruitment assistant.  When answering questions, provide clear, concise, and informative responses.  If you don't know the answer, say so politely. Aim to be helpful and conversational.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ];
            const completion = yield openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
                temperature: 0.7,
                max_tokens: 250,
            });
            const response = ((_a = completion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) || "I'm sorry, I don't have the answer to that question.";
            res.json({ response });
            return;
        }
        const messages = [
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
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            max_tokens: 250,
        });
        const response = ((_b = completion.choices[0].message) === null || _b === void 0 ? void 0 : _b.content) || "I'm sorry, I couldn't generate a relevant response.";
        res.json({ response });
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message || 'Internal server error' });
    }
});
exports.getRecruitmentResponse = getRecruitmentResponse;
