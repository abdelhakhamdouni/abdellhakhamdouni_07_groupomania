import {Action } from '@ngrx/store'
import Post from '../../models/Post'


export const LOAD_POSTS= "[POST] LOAD POSTS"
export const DELETE_POST= "[POST] DELETE POST"
export const ADD_POST= "[POST] ADD POST"
export const ADD_COMMENT_To_POST= "[POST] ADD COMMENT TO POST"


export class AddPost implements Action{
    readonly type = ADD_POST
    constructor(public payload){}
}

export class LoadPosts implements Action{
     readonly type = LOAD_POSTS

     constructor(public payload: Post[]){}
}

export class DeletePost implements Action{
    readonly type= DELETE_POST

    constructor(public payload){}
}

export class AddCommentToPost implements Action{
    readonly type= ADD_COMMENT_To_POST

    constructor(public payload){}
}

export type Actions = AddPost | LoadPosts | DeletePost | AddCommentToPost