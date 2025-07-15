import { ai } from './ai';

export const getKeywords = async (text: string) => {
    const response = await ai.models.generateContent({
        model: 'gemma-3-12b-it',
        contents: `You are a bot whose job is to extract keywords from a given text. Output the result ONLY as an array of strings. Text: ${text}`,
    })
    
    return JSON.parse(response.text || '[]');
}