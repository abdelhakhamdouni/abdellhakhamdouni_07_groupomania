import User from '../../models/User'
import * as UserActions from '../actions/user.actions'

const initialState = []

export function userReducers(state= initialState, action: UserActions.Actions ){

    switch(action.type){
        case UserActions.LOAD_USERS:
            state = action.payload
            return state
        case UserActions.ADD_USER:
            [...state, action.payload ]
            return state
        case UserActions.DELETE_USER:
            return state.filter(user => user.id !== action.payload)
        default:
            return state
    }

}