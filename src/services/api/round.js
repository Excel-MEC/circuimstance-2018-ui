import axios from 'axios'

import AuthAPI from './auth'

class API{

    // URL = 'http://localhost:3000/testData/round.json'
    // URL = 'http://localhost:4000/round'
    URL = 'https://api.excelmec.org/round'


    async getRound(){
        const round = await axios.get(`${this.URL}/`,{ headers: {
            Authorization: `Bearer ${AuthAPI.token}`
        } })

        console.log(round)

        return round.data
    }

    async promoteRound(){
        await axios.get(`${this.URL}/promote`, { headers: {
            Authorization: `Bearer ${AuthAPI.token}`
        } })
    }

    async checkAnswer(questionId,answer){
        const res = await  axios.post(`${this.URL}/check`,{
            id: questionId,
            answer
        },{ headers: {
            Authorization: `Bearer ${AuthAPI.token}`
         } })

         return res.data
    }
}

export default new API()
