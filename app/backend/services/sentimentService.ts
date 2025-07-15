import { pipeline } from '@huggingface/transformers';
import { COMPETITOR_SOCIAL_POSTS, DATA_PATH, DIRECT_SOCIAL_POSTS, OVERALL } from '../constants';
import { loadJsonFile } from '../utils/json';
import path from 'path';
import { Social, SocialMediaPost } from '../../schemas/social';
import { SentimentInsightService } from './sentimentInsightService';

export class SentimentService {
    constructor(private classifier: any, private insightService: SentimentInsightService) {}

    static async create() {
        const classifier = await pipeline('sentiment-analysis')
        return new SentimentService(classifier, new SentimentInsightService());
    }

    private async analyseSentiment(socialData: Social) {
        const sentiment = (await this.classifier(socialData.content))[0];

        if (sentiment.label == 'NEGATIVE') {
            return 1 - sentiment.score;
        }

        return sentiment.score;
    }

    private async analysePost(post: SocialMediaPost) {
        let analaysedPost: any = { ...post };
        let analysedComments = [];
        analaysedPost.sentiment = await this.analyseSentiment(post);

        for (const comment of post.comments) {
            let analysedComment: any = { ...comment };
            analysedComment.sentiment = await this.analyseSentiment(comment);
            analysedComments.push(analysedComment);
        }

        analaysedPost.comments = analysedComments;
        return analaysedPost;
    }

    private async analysePosts(posts: SocialMediaPost[]) {
        const analysedPosts = [];

        for (const post of posts) {
            const analysedPost = await this.analysePost(post);
            analysedPosts.push(analysedPost);
        }

        return analysedPosts;
    }

    private async analyseCampaignSentiment(campaign: string) {
        const directPosts = loadJsonFile(`${DATA_PATH}/${campaign}/${DIRECT_SOCIAL_POSTS}`);
        const competitorPosts = loadJsonFile(`${DATA_PATH}/${campaign}/${COMPETITOR_SOCIAL_POSTS}`);

        const directSentiment = await this.analysePosts(directPosts);
        const competitorSentiment = await this.analysePosts(competitorPosts);

        return {
            directSentiment,
            competitorSentiment
        }
    }

    async analyse(campaign: string) {
        if (campaign == OVERALL) return;
        return await this.analyseCampaignSentiment(campaign);
    }

    async sentimentInsights(campaign: string) {
        let sentimentAnalysis = await this.analyse(campaign);
        if (!sentimentAnalysis) return {};

        let { directSentiment, competitorSentiment } = sentimentAnalysis;
        directSentiment = await this.insightService.getSentimentInsight(directSentiment);
        competitorSentiment = await this.insightService.getSentimentInsight(competitorSentiment);

        return {
            sentimentAnalysis,
            insights: {
                directSentiment,
                competitorSentiment
            }
        }
    }
}

