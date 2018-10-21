import AuthAPI from '../../services/api/auth'
import UserAPI from '../../services/api/user'
// import AuthStore from '../../store/auth'
import ActionTypes from './types'


export const login = () => 
    (dispatch => {
      dispatch({
        type: ActionTypes.LOGIN_PROGRESS
      })

      AuthAPI.signIn()
  })

export const getUserInfo = () => 
    (async dispatch => {
      dispatch({
        type: ActionTypes.LOGIN_PROGRESS
      })

      if(AuthAPI.isAuthenticated()){
        var userData;

        try{
          userData = await UserAPI.updateUserInfo()
        }catch(e){
          return dispatch({
            type: ActionTypes.LOGIN_FAILED,
            payload: e
          })
        }



        return dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: {
            auth: AuthAPI.getProfile(),
            user: userData.data
          } 
        })
      }

      return dispatch({
        type: ActionTypes.LOGIN_FAILED,
        payload: {error: 'not authenticated'}
      })



    })


export const handleAuth = () => (
  async dispatch => {
    try{
      await AuthAPI.handleAuthentication()
    }catch(e){
      return dispatch({
        type: ActionTypes.LOGIN_FAILED,
        payload: e
      })
    }
    
    var userData;

    try{
      userData = await UserAPI.updateUserInfo()
    }catch(e){
      return dispatch({
        type: ActionTypes.LOGIN_FAILED,
        payload: e
      })
    }



    dispatch({
      type: ActionTypes.LOGIN_SUCCESS,
      payload: {
        auth: AuthAPI.getProfile(),
        user: userData.data
      } 
    })
  }
)

export const logout  = () => 
    (dispatch => {
      dispatch({
        type: ActionTypes.LOGOUT_PROGRESS
      })

      AuthAPI.signOut()

      dispatch({
        type: ActionTypes.LOGOUT_SUCCESS
      })
    
    })