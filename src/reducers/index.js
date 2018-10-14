import { combineReducers } from 'redux'

import user from './auth'
import leaderboard from './leaderboard'
import question from './question'
import game from './game'

export default combineReducers({
    user,
    leaderboard,
    question,
    game
})
