import axios from 'axios'
import auth0 from 'auth0-js'

axios.defaults.headers.common["Content-Type"] = "application/json"

class API{

    auth = new auth0.WebAuth({
        domain : 'nvnmo.auth0.com',
        audience: 'https://nvnmo.auth0.com/userinfo',
        clientID: 'FHVUTB2fvLsBDM3nRk19fBVPA4GArhjj',
        redirectUri: 'http://localhost:3000/callback',
        // redirectUri: 'http://circuimstance.excelmec.org/callback',
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

                window.localStorage.setItem('token',this.token)
                window.localStorage.setItem('expiresAt',this.expiresAt)
                window.localStorage.setItem('profile',JSON.stringify(this.profile))

                resolve()
            })
        })
    }

    isAuthenticated = () => {
        if(!(this.token && this.profile && this.expiresAt)) return false
        return new Date().getTime() < this.expiresAt
    }

    signIn = () => {
        this.auth.authorize()
    }

    signOut = () => {
        this.idToken = null
        this.profile = null
        this.expiresAt = null

        window.localStorage.removeItem('token')
        window.localStorage.removeItem('expiresAt')
        window.localStorage.removeItem('profile')
    }

    loadLocalData(){
        console.log('AUth loading local data')
        this.token = window.localStorage.getItem('token')
        this.expiresAt = window.localStorage.getItem('expiresAt')
        this.profile = window.localStorage.getItem('profile')

        try{
            this.profile = JSON.parse(this.profile)
        }catch(e){
            this.profile = null
        }

        try{
            this.expiresAt = Number.parseInt(this.expiresAt)
        }catch(e){
            this.expiresAt = null
        }
    }
}


export default new API()
