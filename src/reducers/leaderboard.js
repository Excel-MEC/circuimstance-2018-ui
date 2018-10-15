import ActionTypes from '../actions/leaderboard/types'

const LEADERBOARD_DEFAULT_STATE = {
    users: []
}

const leaderboard = (state = LEADERBOARD_DEFAULT_STATE, action) => {
    switch(action.type){
        case ActionTypes.LEADERBOARD_UPDATE:{
            return {
                ...state,
                users: action.payload.snapshot
            }
        }
        default: return state
    }
}

export default leaderboard