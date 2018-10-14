import ActionTypes from '../actions/leaderboard/types'

const LEADERBOARD_DEFAULT_STATE = {
}

const leaderboard = (state = LEADERBOARD_DEFAULT_STATE, action) => {
    switch(action.type){
        case ActionTypes.LEADERBOARD_UPDATE:{
            return {
                ...state,
                update: action.payload
            }
        }
        default: return state
    }
}

export default leaderboard