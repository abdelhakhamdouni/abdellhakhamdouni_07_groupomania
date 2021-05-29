import Post from 'src/app/models/Post'
import * as LastLikesAction from '../actions/lastLikes.actions'

const initialState: Post[] = []

export function lastLikesReducers(state = initialState, action: LastLikesAction.Actions) {
    switch (action.type) {
        case LastLikesAction.LOAD_LAST_LIKES:
            state = action.payload
            return state
        default:
            return state
    }
}