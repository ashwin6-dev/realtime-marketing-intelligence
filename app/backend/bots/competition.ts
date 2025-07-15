import { ai } from './ai';

export const summariseCompetitorActivity = async (activities: any[]) => {
    const prompt = `
    You are a bot whose job is to summarise the acitivity of competitors. This includes new deals, campaigns etc that they are launching. 
    You must output ONLY the array containing the short summaries of the different activities competitors are currently on. 
    Activity: ${JSON.stringify(activities)}`;

    const response = await ai.models.generateContent({
        model: 'gemma-3-12b-it',
        contents: prompt,
    })
    
    return JSON.parse(response.text || '[]');
}