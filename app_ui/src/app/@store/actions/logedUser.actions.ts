import { Action } from '@ngrx/store'
import User from '../../models/User'


export const LOAD_LOGED_USER = "[USER] LOAD LOGED USER"
export const LOGOUT_USER = "[USER] LOGOUT USER"

export class LoadLogedUser implements Action {
    readonly type = LOAD_LOGED_USER

    constructor(public payload: User){}
}

export class LogoutUser implements Action {
    readonly type = LOGOUT_USER
    constructor(){}
}


export type Actions = LoadLogedUser | LogoutUser