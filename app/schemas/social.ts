import { User } from "./user";

interface Social {
    content: string;
    likes: number;
    date: Date;
    author: User;
}

export interface PostComment extends Social {}

export interface SocialMediaPost extends Social {
    comments: PostComment[];
}