import axios from 'axios'

import AuthAPI from './auth'

class API{

    URL = 'http://localhost:4000/question'

    async getQuestions(){
        const questionData = await axios.get(`${this.URL}/`,{ headers: {
            'Authorization': `Bearer ${AuthAPI.token}`
        } }).data

        const questions = {}

        for(var question of questionData.questions){
            questions[question._id] = {...question,answered:false}
        }

        for(var id of questionData.questions){
            questions[id].answered = true
        }

        const questionsFinal = Object.values(questions)

        const bonusQuestionCount = questionData.bonusQuestionCount

        return {bonusQuestionCount,questions: questionsFinal}
    }

    async getBonusQuestion(){
        return await axios.get(`${this.URL}/bonus`,{ headers:{
            'Authorization': `Bearer ${AuthAPI.token}`
        } }).data
    }
}


export default new API()

