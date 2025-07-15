import { Social } from "../../schemas/social";

interface AnalysedSocial extends Social {
    sentiment: number;
}

interface AnalysedSocialPost extends AnalysedSocial {
    comments: AnalysedSocial[];
}

export class SentimentInsightService {
    getAgeInsights(post: AnalysedSocialPost) {
        const ageGroups: { [group: string]: number[] } = {
            '13-17': [],
            '18-24': [],
            '25-34': [],
            '35-44': [],
            '45-54': [],
            '55-64': [],
            '65+': []
        };

        const addSentimentToGroup = (age: number, sentiment: number) => {
            if (age >= 13 && age <= 17) ageGroups['13-17'].push(sentiment);
            else if (age >= 18 && age <= 24) ageGroups['18-24'].push(sentiment);
            else if (age >= 25 && age <= 34) ageGroups['25-34'].push(sentiment);
            else if (age >= 35 && age <= 44) ageGroups['35-44'].push(sentiment);
            else if (age >= 45 && age <= 54) ageGroups['45-54'].push(sentiment);
            else if (age >= 55 && age <= 64) ageGroups['55-64'].push(sentiment);
            else if (age >= 65) ageGroups['65+'].push(sentiment);
        };

        addSentimentToGroup(post.author.age, post.sentiment);

        for (const comment of post.comments) {
            addSentimentToGroup(comment.author.age, comment.sentiment);
        }

        const averages: { [group: string]: number } = {};
        for (const group in ageGroups) {
            const sentiments = ageGroups[group];
            if (sentiments.length > 0) {
                const sum = sentiments.reduce((acc, val) => acc + val, 0);
                averages[group] = sum / sentiments.length;
            } else {
                averages[group] = 0;
            }
        }

        return averages;
    }

    getGenderInsights(post: AnalysedSocialPost) {
        const genders: { [gender: string]: number[] } = {};

        const addSentimentToGender = (gender: string, sentiment: number) => {
            if (!genders[gender]) {
                genders[gender] = [];
            }
            genders[gender].push(sentiment);
        };

        addSentimentToGender(post.author.gender, post.sentiment);

        for (const comment of post.comments) {
            addSentimentToGender(comment.author.gender, comment.sentiment);
        }

        const averages: { [gender: string]: number } = {};
        for (const gender in genders) {
            const sentiments = genders[gender];
            if (sentiments.length > 0) {
                const sum = sentiments.reduce((acc, val) => acc + val, 0);
                averages[gender] = sum / sentiments.length;
            } else {
                averages[gender] = 0;
            }
        }

        return averages;
    }

    getSentimentInsight(posts: AnalysedSocialPost[]) {
        return posts.map(post => ({
            byAge: this.getAgeInsights(post),
            byGender: this.getGenderInsights(post)
        }));
    }
}