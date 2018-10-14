import React, { Component } from 'react'
import {Input, Icon  } from 'semantic-ui-react'

import styles from './login.signup-form.module.css'

export default class SignUpForm extends Component{
  state = {
    name: '',
    email: '',
    phone: '',
    password: ''
  }

  handleChange = (e) => {
      const newState = {}
      newState[e.target.name] = e.target.value
      this.setState(newState)
  }

  render(){
    return (
      <div className={styles['signup-form']}>
          <div className={styles['signup-username-field'] + " animated fadeInDown"}>
              <Input fluid placeholder="Full Name" onChange={this.handleChange} name="name"/>
          </div>
          <div className={styles['signup-username-field'] + " animated fadeInDown"}>
              <Input fluid iconPosition='left' placeholder='Email' onChange={this.handleChange} name="email">
                  <Icon name='at' />
                  <input />
              </Input>
          </div>
          <div className={styles['signup-username-field'] + " animated fadeInDown"}>
              <Input fluid iconPosition='left' placeholder='Phone' onChange={this.handleChange} name="phone">
                  <Icon name='phone' />
                  <input />
              </Input>
          </div>
          <div className={styles['signup-password-field'] + " animated fadeInDown"}>
              <Input fluid type="password" placeholder="Password" onChange={this.handleChange} name="password"/>
          </div>
      </div>
    )
  }
}
