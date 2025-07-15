import { ai } from './ai';

const brandDesc = 'We are McDonalds and we want to make the best fast food possible.';

export const determineEmbassdorFit = async (celebActivity: any[]) => {
    const prompt = `
    You are a bot whose job is to determine how good a celebrity would be to represent our brand.
    You are given the acvitiy online of the celebrity and a description of our brand.

    Our Brand: ${brandDesc}
    Activity: ${JSON.stringify(celebActivity)}
    
    You must ONLY output as an array of length two, where the first element is the score (0 - 100) of how good they'd be, the second element is your reasoning as a string.
    `;

    const response = await ai.models.generateContent({
        model: 'gemma-3-12b-it',
        contents: prompt,
    })

    console.log(response.text);
    
    return JSON.parse(response.text || '[]');
}