import  User  from 'src/app/models/User';
import Comment from './Comment';
export default interface Post{
    id: number;
    image?: string;
    User: User;
    likes?: number;
    Comments: Comment[]
    title?: string;
    description?:string;
    createdAt:string;
    updatedAt:string;
    UserId: number;
}