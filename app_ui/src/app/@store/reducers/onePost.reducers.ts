import Post from '../../models/Post'
import * as PostActions from '../actions/onePost.actions'

let initialState: Post;


// Section 2
export function onePostReducers(state:Post = initialState, action: PostActions.Actions) {
    let newState:any
    // Section 3
    switch(action.type) {
        case PostActions.LOAD_POST:
            newState = action.payload
            return newState || state
        case PostActions.ADD_POST_COMMENT:
            newState = state
            console.log(state)
            return state
        default:
            return state;
    }
}
