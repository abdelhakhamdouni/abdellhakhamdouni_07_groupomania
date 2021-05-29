import Post from "./models/Post";
import User from "./models/User";

export interface AppState{
    readonly post: [],
    readonly onePost: Post
    readonly user:User[]
    readonly oneUser: User
    readonly lastPosts: Post[]
    readonly lastLikes: any[]
    readonly message: []
}