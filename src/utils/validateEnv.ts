export const validateEnv = (): void => {
    if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is missing');
};
