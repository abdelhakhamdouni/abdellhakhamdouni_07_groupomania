import Post from 'src/app/models/Post'
import * as LastPostAction from '../actions/lastPost.actions'

const initialState: Post[] = []

export function lastLikesReducers(state = initialState, action: LastPostAction.Actions) {
    switch (action.type) {
        case LastPostAction.LOAD_LAST_POST:
            state = action.payload
            return state
        default:
            return state
    }
}