import RoundAPI from '../../services/api/round'
import ActionTypes from './types'
import UserActionTypes from '../auth/types'
import AuthAPI from '../../services/api/auth'
import UserAPI from '../../services/api/user'



export function checkAnswer(questionId=null,answer=null){
    return async dispatch => {
        var round,user

        console.log("check answer: ",questionId,answer)

        try{
            if(answer !== null){
                round = await RoundAPI.checkAnswer(questionId,answer)
            }else{
                await RoundAPI.promoteRound()
                round = await RoundAPI.getRound()
            }
            user = await UserAPI.updateUserInfo()
        }catch(e){
            return
        }

        const questionCount = round.questions.filter(q => !q.answered).length

        if(questionCount == 0 && round.questions.length > 0){
            try{
                await RoundAPI.promoteRound()
                round = await RoundAPI.getRound()
                user = await UserAPI.updateUserInfo()
            }catch(e){
                return
            }
        }

        return [
            dispatch({
                type: ActionTypes.ROUND_FETCHED,
                payload: {round}
            }),
            dispatch({
                type: UserActionTypes.LOGIN_SUCCESS,
                payload: {
                  auth: AuthAPI.getProfile(),
                  user: user.data
                } 
              })
        ]


    }
}
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
