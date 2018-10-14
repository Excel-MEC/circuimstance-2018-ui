import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAuth } from '../actions/auth'
import { Redirect } from 'react-router-dom'

const mapStateToProps = state => ({
    auth: state.auth
})


const mapDispatchToProps = dispatch => ({
    handleAuthAction: () => dispatch(handleAuth()),
})


class Callback extends Component{
    
    componentDidMount(){
        this.props.handleAuthAction()
    }

    render(){

        if(this.props.auth.loginFailed){
            return (
                <Redirect to="/login"/>
            )
        }else if (this.props.auth.authenticated)
            return (
                <Redirect to="/dashboard"/>
            )

        return <h1>Loading</h1>


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Callback)