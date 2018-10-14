import RoundActionTypes from '../actions/round/types'

const DEFAULT_STATE = {
    questions: [],
    loading: false,
    error: false
}

const question = (state=DEFAULT_STATE,action) => {
    switch(action.type){

        case RoundActionTypes.ROUND_FETCHING:{
            return {
                ...state,
                loading: true,
                error: false
            }
        } 

        case RoundActionTypes.ROUND_FETCHED:{
            const questions = payload.round.questions
            return {
                ...state,
                loading: false,
                questions,
                error: false
            }
        }

        case RoundActionTypes.ROUND_FETCH_FAILED:{
            return {
                ...state,
                loading: false,
                questions:[],
                error: true
            }
        }

        default: return {...state}
    }
}

export default question