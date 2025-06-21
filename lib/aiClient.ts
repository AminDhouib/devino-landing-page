/**
 * Tiny helper that wraps the OpenRouter client
 */
import OpenAI from 'openai';

export const aiClient = new OpenAI({
    baseURL: process.env.OPENROUTER_BASE_URL ?? 'https://openrouter.ai/api/v1',
    apiKey : process.env.OPENROUTER_API_KEY,
});
