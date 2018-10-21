import ActionTypes from '../actions/auth/types'
import RoundActionTypes from '../actions/round/types'

import AuthAPI from '../services/api/auth'

AuthAPI.loadLocalData()

console.log('auth reducer ',AuthAPI.isAuthenticated(), AuthAPI)

const userProfile = {}
const isAuthenticated = AuthAPI.isAuthenticated()

if(isAuthenticated){
    userProfile['name'] = AuthAPI.profile.name  || 'Some Person'
    userProfile['avatarUrl'] = AuthAPI.profile.picture || 'https://api.adorable.io/avatars/100/someuser'
}else{
    userProfile['name'] = 'Some Person'
    userProfile['avatarUrl'] = 'https://api.adorable.io/avatars/100/someuser'
}

const AUTH_DEFAULT_STATE = {
    loginProgress: false,
    authenticated: isAuthenticated,
    admin: false,
    loginFailed: false,
    bonusEligible: false,
    ...userProfile,
    score: 0,
    rank: 0
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
                avatarUrl: action.payload.auth.picture,
                score: action.payload.user.score,
                rank: action.payload.user.rank,
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