import  User  from 'src/app/models/User';
export default interface Post{
    id: number;
    image?: string;
    User: User;
    likes?: number;
    comment?: any;
    title?: string;
    description?:string;
    createdAt:string;
    updatedAt:string;
    UserId: number;
}