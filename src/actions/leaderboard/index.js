import ActionTypes from './types'

export const leaderboardUpdate = (data) => ({
    type: ActionTypes.LEADERBOARD_UPDATE,
    payload: data
})