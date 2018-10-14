import axios from 'axios'

import AuthAPI from './auth'

axios.defaults.headers.common["Content-Type"] = "application/json"

class API{
    
    URL = 'http://localhost:4000'
    
    async getUserInfo(){
        return await axios.post(`${this.URL}/user/`,{ headers: {
            'Authorization': `Bearer ${AuthAPI.token}`
        }})
    }

    async updateUserInfo(){
        return await axios.get(`${this.URL}/auth/`,{ headers: {
            'Authorization': `Bearer ${AuthAPI.token}`
        }})
    }
}

export default new API()