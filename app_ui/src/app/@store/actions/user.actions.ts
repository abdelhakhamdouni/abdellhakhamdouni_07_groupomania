import { Action } from '@ngrx/store'
import User from '../../models/User'


export const ADD_USER = "[USER] ADD USER"
export const DELETE_USER= "[USER] DELETE USER"
export const LOAD_USERS = "[USER] LOAD USER"

export class AddUser implements Action {
    readonly type = ADD_USER

    constructor(public payload: User){}
}

export class LoadUsers implements Action {
    readonly type = LOAD_USERS

    constructor(public payload: User[]){}
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER

    constructor(public payload: number){}
}

export type Actions = AddUser | DeleteUser | LoadUsers 