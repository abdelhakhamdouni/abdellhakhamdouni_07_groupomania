import {Action } from '@ngrx/store'

export const LOAD_LAST_LIKES= "[POST] LOAD LASTLIKES"

export class LoadLastLikes implements Action{
     readonly type = LOAD_LAST_LIKES

     constructor(public payload: any[]){}
}

export type Actions = LoadLastLikes