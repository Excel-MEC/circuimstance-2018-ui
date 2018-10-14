import React, { Component } from 'react'
import {Input } from 'semantic-ui-react'

import styles from './login.login-form.module.css'

export default class LoginForm extends Component{

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
      const newState = {}
      newState[e.target.name] = e.target.value
      this.setState(newState)
  }

  render(){
    return (
      <div className={styles['login-form']}>
          <div className={styles['login-username-field'] + " animated fadeIn"}>
              <Input fluid placeholder="Email" onChange={this.handleChange} name="email" />
          </div>
          <div className={styles['login-password-field'] + " animated fadeIn"}>
              <Input fluid type="password" placeholder="Password" onChange={this.handleChange} name="password"/>
          </div>
      </div>
    )
  }
}
