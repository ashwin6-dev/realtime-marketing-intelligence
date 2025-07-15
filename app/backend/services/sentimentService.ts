import { pipeline } from '@huggingface/transformers';
import { COMPETITOR_SOCIAL_POSTS, DATA_PATH, DIRECT_SOCIAL_POSTS, OVERALL } from '../constants';
import { loadJsonFile } from '../utils/json';
import path from 'path';
import { SocialMediaPost } from '../../schemas/social';

export class SentimentService {
    constructor(private classifier: any) {}

    static async create() {
        const classifier = await pipeline('sentiment-analysis')
        return new SentimentService(classifier);
    }

    private async analysePostSentiment(post: SocialMediaPost) {
        const interactions = [post, ...post.comments]
        let totalScore = 0;
        let likesTotal = 0;
        
        for (const interaction of interactions) {
            const sentiment = (await this.classifier(interaction.content))[0];
            if (sentiment.label == 'NEGATIVE') totalScore += interaction.likes * (1 - sentiment.score);
            else totalScore += interaction.likes * sentiment.score;

            likesTotal += interaction.likes;
        }

        return totalScore / likesTotal;
    }

    private async analyseCampaignSentiment(campaign: string) {
        const directPosts = loadJsonFile(`${DATA_PATH}/${campaign}/${DIRECT_SOCIAL_POSTS}`);
        const competitorPosts = loadJsonFile(`${DATA_PATH}/${campaign}/${COMPETITOR_SOCIAL_POSTS}`);

        const directSentiment = []
        const competitorSentiment = []

        for (const post of directPosts) {
            const sentiment = await this.analysePostSentiment(post);
            directSentiment.push({
                ...post,
                sentiment
            });
        }

        for (const post of competitorPosts) {
            const sentiment = await this.analysePostSentiment(post);
            competitorSentiment.push({
                ...post,
                sentiment
            });
        }

        return {
            directSentiment,
            competitorSentiment
        }
    }

    async analyseSentiment(campaign: string) {
        if (campaign == OVERALL) return;
        return await this.analyseCampaignSentiment(campaign);
    }
}

