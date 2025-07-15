import { User } from './user';

export interface PostComment {
    content: string;
    likes: number;
    author: User;
}