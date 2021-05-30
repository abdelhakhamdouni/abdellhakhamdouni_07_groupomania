import * as UserActions from '../actions/logedUser.actions'

const initialState:any ={}

export function logedUserReducers(state = initialState, action: UserActions.Actions) {

    switch (action.type) {
        case UserActions.LOAD_LOGED_USER:
            return action.payload
        case UserActions.LOGOUT_USER:
            return initialState
        default:
            return state
    }

}