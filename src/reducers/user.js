import ActionTypes from '../actions/user/types'
import AuthActionTypes from '../actions/auth/types'

const USER_DEFAULT_STATE = {

}

const user = (state = USER_DEFAULT_STATE, action ) => {
    switch(action.type){
        case AuthActionTypes.LOGIN_SUCCESS:{
            console.log('update user data')
            return{
                ...state,
                score: action.payload.user.score,
                rank: action.payload.user.rank,
                showBonus: action.payload.user.showBonus,
                answeredQuestions: action.payload.user.answeredQuestions
            }
        }
        case ActionTypes.USER_FETCH_SUCCESS: {
            return {
                ...state,
                ...action.payload
            }
        }

        default: return state
    }
} 

export default user