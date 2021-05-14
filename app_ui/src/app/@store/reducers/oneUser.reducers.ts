import User from '../../models/User'
import * as UserActions from '../actions/oneUser.actions'

const initialState = {}

export function oneUserReducers(state= initialState, action: UserActions.Actions ){

    switch(action.type){
        case UserActions.LOAD_USER:
            return action.payload
        default:
            return state
    }

}