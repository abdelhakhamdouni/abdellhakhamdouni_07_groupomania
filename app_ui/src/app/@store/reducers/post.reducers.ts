import Post from '../../models/Post'
import * as PostActions from '../actions/post.actions'

const initialState = []


// Section 2
export function postReducers(state = initialState, action: PostActions.Actions) {
    let newState:any
    // Section 3
    switch(action.type) {
        case PostActions.ADD_POST:
            newState = action.payload
            return newState || state
        case PostActions.LOAD_POSTS:
            newState = action.payload
            return newState || state
        case PostActions.DELETE_POST:
            newState =  state.filter(post => post.id != action.payload) 
            return newState || state;
        default:
            return state;
    }
}
