import { loadJsonFile } from "../utils/json";
import { getKeywords } from "../bots/keyword";
import { DATA_PATH, OVERALL, TRENDING_POSTS } from "../constants";

export class TrendInsightService {
    static create() {
        return new TrendInsightService();
    }

    async trendInsights() {
        const trendingPosts = loadJsonFile(`${DATA_PATH}/${OVERALL}/${TRENDING_POSTS}`);
        const keywordedPosts: any[] = [];

        for (const post of trendingPosts) {
            let totalContent = post.content;
            for (const comment of post.comments) {
                totalContent += ' ' + comment.content;
            }
            let postKeywords = await getKeywords(totalContent);

            keywordedPosts.push({
                ...post,
                keywords: postKeywords
            });
        }

        return keywordedPosts;
    }

    private getAgeGroup(age: number): string {
        if (age >= 13 && age <= 17) return '13-17';
        else if (age >= 18 && age <= 24) return '18-24';
        else if (age >= 25 && age <= 34) return '25-34';
        else if (age >= 35 && age <= 44) return '35-44';
        else if (age >= 45 && age <= 54) return '45-54';
        else if (age >= 55 && age <= 64) return '55-64';
        else return '65+';
    }

    async getKeywordDemographicInsights() {
        const trendingPosts = loadJsonFile(`${DATA_PATH}/${OVERALL}/${TRENDING_POSTS}`);

        const keywordAgeGroups: { [keyword: string]: { [ageGroup: string]: number } } = {};
        const keywordGenders: { [keyword: string]: { [gender: string]: number } } = {};

        for (const post of trendingPosts) {
            let totalContent = post.content;
            for (const comment of post.comments) {
                totalContent += ' ' + comment.content;
            }
            const keywords = await getKeywords(totalContent);

            for (const keyword of keywords) {
                if (!keywordAgeGroups[keyword]) keywordAgeGroups[keyword] = {};
                if (!keywordGenders[keyword]) keywordGenders[keyword] = {};

                // Count post author
                const postAgeGroup = this.getAgeGroup(post.author.age);
                const postGender = post.author.gender;
                keywordAgeGroups[keyword][postAgeGroup] = 
                    (keywordAgeGroups[keyword][postAgeGroup] || 0) + 1;
                keywordGenders[keyword][postGender] = 
                    (keywordGenders[keyword][postGender] || 0) + 1;

                // Count commenters
                for (const comment of post.comments) {
                    const commentAgeGroup = this.getAgeGroup(comment.author.age);
                    const commentGender = comment.author.gender;
                    keywordAgeGroups[keyword][commentAgeGroup] = 
                        (keywordAgeGroups[keyword][commentAgeGroup] || 0) + 1;
                    keywordGenders[keyword][commentGender] = 
                        (keywordGenders[keyword][commentGender] || 0) + 1;
                }
            }
        }

        return {
            byAgeGroup: keywordAgeGroups,
            byGender: keywordGenders
        };
    }
}
