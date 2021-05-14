import { Action } from '@ngrx/store'
import User from '../../models/User'


export const LOAD_USER = "[USER] LOAD ONE USER"


export class LoadOneUser implements Action {
    readonly type = LOAD_USER

    constructor(public payload: User){}
}


export type Actions = LoadOneUser