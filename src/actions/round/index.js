import RoundAPI from '../../services/api/round'
import ActionTypes from './types'


export function getRound(){
    return async dispatch => {
        dispatch({
            type: ActionTypes.ROUND_FETCHING
        })

        var round

        try{
            round = await RoundAPI.getRound()
        }catch(e){
            return dispatch({
                type: ActionTypes.ROUND_FETCH_FAILED,
                payload: e
            })
        }

        return [
            dispatch({
                type: ActionTypes.ROUND_FETCHED,
                payload: {round}
            })
        ]

    }
}

export function promoteRound(){
    return async dispatch => {
        
        try{
            await RoundAPI.promoteRound()
        }catch(e){
            return dispatch({
                type: ActionTypes.PROMOTION_FAILED,
                payload: e
            })
        }

        return dispatch({
            type: ActionTypes.PROMOTION_SUCCESS
        })
    }
}