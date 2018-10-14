import ActionTypes from '../actions/auth/types'
import RoundActionTypes from '../actions/round/types'

const AUTH_DEFAULT_STATE = {
    loginProgress: false,
    authenticated: false,
    admin: false,
    loginFailed: false,
    bonusEligible: false,
    name: 'Some Person',
    avatarUrl: 'https://api.adorable.io/avatars/100/someuser'
}

const auth = ( state = AUTH_DEFAULT_STATE, action) => {
    switch(action.type){

        case RoundActionTypes.ROUND_FETCHED:{
            return {
                ...state,
                bonusEligible: action.payload.round.bonusEligible
            }
        }

        case RoundActionTypes.ROUND_FETCH_FAILED:{
            return {
                ...state,
                bonusEligible: false
            }
        }

        case ActionTypes.LOGIN_PROGRESS: {
            const loginProgress = true
            return { 
                ...state, 
                loginProgress,
                loginFailed: false,
                admin: false
             }
        }

        case ActionTypes.LOGIN_SUCCESS: {
            return {
                ...state,
                loginProgress: false,
                authenticated: true,
                loginFailed: false,
                admin: false,
                name: action.payload.auth.name,
                avatarUrl: action.payload.auth.picture
            }
        }

        case ActionTypes.LOGIN_FAILED: {
            return {
                ...state,
                loginProgress: false,
                authenticated: false,
                loginFailed: true,
                admin: false
            }
        }

        case ActionTypes.LOGOUT_PROGRESS: {
            return {
                ...state,
                loginProgress: true,
                admin: false,
                loginFailed: false,
                name: '',
                avatarUrl: AUTH_DEFAULT_STATE.avatarUrl
            }
        }

        case ActionTypes.LOGOUT_SUCCESS: {
            return {
                ...state,
                loginProgress: false,
                authenticated: false,
                admin: false,
                loginFailed: false
            }
        }

        default: return state
    }
}


export default auth