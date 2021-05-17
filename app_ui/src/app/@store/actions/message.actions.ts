import {Action } from '@ngrx/store'
import Message from '../../models/Message'


export const LOAD_MESSAGES= "[MESSAGE] LOAD MESSAGES"
export const DELETE_MESSAGE= "[MESSAGE] DELETE MESSAGE"
export const ADD_MESSAGE= "[MESSAGE] ADD MESSAGE"


export class AddMessage implements Action{
    readonly type = ADD_MESSAGE
    constructor(public payload: Message){}
}

export class LoadMessages implements Action{
     readonly type = LOAD_MESSAGES

     constructor(public payload: Message[]){}
}

export class DeleteMessage implements Action{
    readonly type= DELETE_MESSAGE

    constructor(public payload: number){}
}

export type Actions = AddMessage | LoadMessages | DeleteMessage