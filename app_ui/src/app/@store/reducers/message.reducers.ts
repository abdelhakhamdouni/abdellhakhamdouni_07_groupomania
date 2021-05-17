import Post from '../../models/Post'
import * as MesssageActions from '../actions/message.actions'

const initialState = []


// Section 2
export function messageReducers(state = initialState, action: MesssageActions.Actions) {
    let newState:any
    // Section 3
    switch(action.type) {
        case MesssageActions.ADD_MESSAGE:
            newState = action.payload
            return newState || state
        case MesssageActions.LOAD_MESSAGES:
            newState = action.payload
            return newState || state
        case MesssageActions.DELETE_MESSAGE:
            newState =  state.filter(post => post.id != action.payload) 
            return newState || state;
        default:
            return state;
    }
}
