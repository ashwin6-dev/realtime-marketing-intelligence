import { PostComment } from "./comment";

export interface SocialMediaPost {
    content: string;
    likes: number;
    comments: PostComment[];
    
}