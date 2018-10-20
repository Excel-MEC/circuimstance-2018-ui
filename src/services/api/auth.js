import axios from 'axios'
import auth0 from 'auth0-js'

axios.defaults.headers.common["Content-Type"] = "application/json"

class API{

    auth = new auth0.WebAuth({
        domain : 'nvnmo.auth0.com',
        audience: 'https://nvnmo.auth0.com/userinfo',
        clientID: 'FHVUTB2fvLsBDM3nRk19fBVPA4GArhjj',
//        redirectUri: 'http://localhost:3000/callback',
        redirectUri: 'http://circuimstance.excelmec.org/callback',
        responseType: 'token id_token',
        scope: 'openid profile'
    }) 

    getProfile = () => {
        return this.profile
    }

    getIdToken = () => {
        return this.idToken
    }

    handleAuthentication = () => {
        return new Promise((resolve,reject) => {
            this.auth.parseHash((err,authResult) => {
                if (err) return reject(err)

                if(!authResult && !authResult.idToken) return reject(err)

                this.profile = authResult.idTokenPayload
                this.token = authResult.idToken


                this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
                resolve()
            })
        })
    }

    isAuthenticated = () => {
        return new Date().getTime() < this.expiresAt
    }

    signIn = () => {
        this.auth.authorize()
    }

    signOut = () => {
        this.idToken = null
        this.profile = null
        this.expiresAt = null

    }
}


export default new API()
