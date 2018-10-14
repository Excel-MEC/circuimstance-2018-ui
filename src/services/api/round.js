import axios from 'axios'

import AuthAPI from './auth'

class API{

    URL = 'http://localhost:3000/testData/round.json'


    async getRound(){
        const round = await axios.get(`${this.URL}/`,{ headers: {
            Authorization: `Bearer ${AuthAPI.token}`
        } }).data

        return round
    }

    async promoteRound(){
        await axios.get(`${this.URL}/promote`, { headers: {
            Authorization: `Bearer ${AuthAPI.token}`
        } })
    }

    async checkAnswer(questionId,answer){
        return await axios.post(`${this.URL}/check`,{
            id: questionId,
            answer
        },{ headers: {
            Authorization: `Bearer ${AuthAPI.token}`
         } }).data
    }
}

export default new API()
