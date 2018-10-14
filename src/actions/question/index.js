import ActionTypes from './types'
import QuestionAPI from '../../services/api/question'

export const fetchBonusQuestion = () => (
    async dispatch => {

        var question

        try{
            question = await QuestionAPI.getBonusQuestion()
        }catch(e){
            return
        }

        dispatch({
            type: ActionTypes.BONUS_QUESTION_FETCHED,
            payload: question
        })
    }
)

export const fetchQuestions = () => (
    async dispatch => {
        dispatch({
            type: ActionTypes.FETCHING_QUESTIONS
        })

        var questions

        try{
            questions = await QuestionAPI.getQuestions()
        }catch(e){
            return dispatch({
                type: ActionTypes.QUESTIONS_FETCH_FAILED
            })
        }

        dispatch({
            type: ActionTypes.QUESTIONS_FETCHED,
            payload: questions
        })
    }
)