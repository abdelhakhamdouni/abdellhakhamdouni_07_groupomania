import {Action } from '@ngrx/store'
import Post from '../../models/Post'


export const LOAD_LAST_POST= "[POST] LOAD LASTPOST"

export class LoadLastPost implements Action{
     readonly type = LOAD_LAST_POST

     constructor(public payload: Post[]){}
}
export type Actions = LoadLastPost