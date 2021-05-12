import Post from "./models/Post";
import User from "./models/User";

export interface AppState{
    readonly post: Post[],
    readonly user:User[]
}