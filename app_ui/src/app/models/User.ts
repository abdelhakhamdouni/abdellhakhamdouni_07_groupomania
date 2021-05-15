import Post from 'src/app/models/Post';
import Comment from 'src/app/models/Comment';
export default interface User {
        id: number;
        firstName: string;
        lastName: string;
        avatar: string;
        email: string;
        password: string;
        createdAt: string;
        isAdmin:boolean;
        Posts:Post[],
        Comments: Comment[]

}
