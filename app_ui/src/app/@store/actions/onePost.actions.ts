import {Action } from '@ngrx/store'
import Post from '../../models/Post'
import Comment from '../../models/Comment'


export const LOAD_POST= "[POST] LOAD ONEPOST"
export const ADD_POST_COMMENT= "[POST] ADD POST COMMENT"

export class LoadPost implements Action{
     readonly type = LOAD_POST

     constructor(public payload: Post){}
}

export class AddCommentToPost implements Action{
    readonly type= ADD_POST_COMMENT

    constructor(public payload:Comment){}
}

export type Actions = LoadPost | AddCommentToPost