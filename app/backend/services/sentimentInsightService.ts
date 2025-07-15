import { Social } from "../../schemas/social";

interface AnalysedSocial extends Social {
    sentiment: number;
}

interface AnalysedSocialPost extends AnalysedSocial {
    comments: AnalysedSocial[];
}

export class SentimentInsightService {
    private computeGroupedAverages<T>(
        post: AnalysedSocialPost,
        getKey: (author: { age: number; gender: string }) => T
    ): Record<string, number> {
        const groups: Record<string, number[]> = {};

        const addToGroup = (author: { age: number; gender: string }, sentiment: number) => {
            const key = String(getKey(author));
            if (!groups[key]) groups[key] = [];
            groups[key].push(sentiment);
        };

        addToGroup(post.author, post.sentiment);
        for (const comment of post.comments) {
            addToGroup(comment.author, comment.sentiment);
        }

        const averages: Record<string, number> = {};
        for (const key in groups) {
            const sentiments = groups[key];
            averages[key] = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
        }

        return averages;
    }

    getAgeInsights(post: AnalysedSocialPost) {
        return this.computeGroupedAverages(post, author => {
            const age = author.age;
            if (age >= 13 && age <= 17) return '13-17';
            if (age >= 18 && age <= 24) return '18-24';
            if (age >= 25 && age <= 34) return '25-34';
            if (age >= 35 && age <= 44) return '35-44';
            if (age >= 45 && age <= 54) return '45-54';
            if (age >= 55 && age <= 64) return '55-64';
            return '65+';
        });
    }

    getGenderInsights(post: AnalysedSocialPost) {
        return this.computeGroupedAverages(post, author => author.gender);
    }

    getSentimentInsight(posts: AnalysedSocialPost[]) {
        const allAgeGroups: Record<string, number[]> = {};
        const allGenderGroups: Record<string, number[]> = {};

        const addToGroup = (author: { age: number; gender: string }, sentiment: number) => {
            // Age
            const age = author.age;
            let ageGroup = '';
            if (age >= 13 && age <= 17) ageGroup = '13-17';
            else if (age >= 18 && age <= 24) ageGroup = '18-24';
            else if (age >= 25 && age <= 34) ageGroup = '25-34';
            else if (age >= 35 && age <= 44) ageGroup = '35-44';
            else if (age >= 45 && age <= 54) ageGroup = '45-54';
            else if (age >= 55 && age <= 64) ageGroup = '55-64';
            else ageGroup = '65+';

            if (!allAgeGroups[ageGroup]) allAgeGroups[ageGroup] = [];
            allAgeGroups[ageGroup].push(sentiment);

            // Gender
            const gender = author.gender;
            if (!allGenderGroups[gender]) allGenderGroups[gender] = [];
            allGenderGroups[gender].push(sentiment);
        };

        for (const post of posts) {
            addToGroup(post.author, post.sentiment);
            for (const comment of post.comments) {
                addToGroup(comment.author, comment.sentiment);
            }
        }

        // Compute averages
        const average = (arr: number[]) =>
            arr.reduce((a, b) => a + b, 0) / arr.length;

        const byAge: Record<string, number> = {};
        for (const group in allAgeGroups) {
            byAge[group] = average(allAgeGroups[group]);
        }

        const byGender: Record<string, number> = {};
        for (const group in allGenderGroups) {
            byGender[group] = average(allGenderGroups[group]);
        }

        return {
            byAge,
            byGender
        };
    }
}
