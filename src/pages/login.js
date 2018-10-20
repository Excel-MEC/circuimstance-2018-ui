import React, { Component } from 'react'
import { Container,Button  } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'


import { login } from '../actions/auth'

import styles from './login.module.css'

import chip from '../img/circumstance.png'
import circuitBg from '../img/circuit-pattern-light.jpg'
import excelLogo from '../img/excel.png'
import mecLogo from '../img/mec.png'

const mapStateToProps = state => ({
    auth: state.user
})


const mapDispatchToProps = dispatch => ({
    loginAction: () => dispatch(login()),
})


class Login extends Component{
    state = {
        loginButtonClasses: styles['login-button'] + " animated",
        loginLoading: false,
        loginForm: true,
    }

    constructor(props){
        super(props)
    }


    componentDidMount(){

        const prefix = this.state.loginButtonClasses
        this.swingAnimationTimer = setTimeout(() => {
            this.setState({loginButtonClasses: prefix + " swing"})
        },1500)

    }

    componentWillUnmount(){
      clearTimeout(this.swingAnimationTimer)   
    }

    toggleLoginSignUp(){
        if(!this.props.auth.loginLoading){
            this.setState({loginForm: !this.state.loginForm})
        }
    }

    handleLogin(){
        if(this.state.loginForm){
          this.props.loginAction(this.loginForm.state.email,this.loginForm.state.password)

        }else{
            const {name,email,phone,password} = this.signupForm.state
            this.props.signupAction(name,email,phone,password)
        }
    }

    render(){

        if(this.props.auth.authenticated){
            return <Redirect to="/dashboard"/>
        }

        document.title = 'CIRCUImsTance - Login'

        return (
            <div className={styles['login-bg']} style={{backgroundImage: `url(${circuitBg})`}}>
                <a href="https://excelmec.org"><img className={styles['excel-logo']} src={excelLogo} /></a>
                <a href="http://mec.ac.in"><img className={styles['mec-logo']} src={mecLogo} /></a>
                <Container textAlign='center'>
                    <div className={styles['login-box']}>
                        <div className={styles['login-header-icon'] + " animated fadeInDown"}>
                            <img src={chip} alt="icon"/>
                        </div>
                        <h2><span>CIRCUI</span>ms<span>T</span>ance</h2>  
                        <div className={this.state.loginButtonClasses} ref={this.loginButtonContainer}>
                            <Button 
                                primary
                                loading={this.props.auth.loginProgress}
                                disabled={this.props.auth.loginProgress}
                                onClick={this.props.loginAction}
                            >
                                {this.state.loginForm?"Login":"Sign Up"}
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login)
