import RoundActionTypes from '../actions/round/types'

const GAME_DEFAULT_STATE = {
    round: 1,
    roundDescription: '',
    roundTitle: '',
    imageURL: '',
    error: false,
    loading: false
}

const game = ( state = GAME_DEFAULT_STATE, action ) => {
    switch(action.type){

        case RoundActionTypes.ROUND_FETCHED: {
            
            const round = action.payload.round
            return{
                ...state,
                roundDescription: round.description,
                roundTitle: round.roundName,
                imageURL: round.imageURL,
                error: false,
                loading: false
            }
        }

        case RoundActionTypes.ROUND_FETCH_FAILED:{
            return {
                ...GAME_DEFAULT_STATE,
                error: true
            }
        }

        case RoundActionTypes.ROUND_FETCHING:{
            return{
                ...GAME_DEFAULT_STATE,
                loading: true
            }
        }

        default: return { ...state }
    }
}