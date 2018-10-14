import React, { Component } from 'react'
import {  Menu, Segment } from 'semantic-ui-react'
import { Link, Route } from 'react-router-dom'

import { logout } from '../actions/auth'
import { connect } from 'react-redux'

import styles from './admin.module.css'

const mapStateToProps = state => ({})


const mapDispatchToProps = dispatch => ({
  loginAction: () => dispatch(logout())
})

class AdminPage extends Component{
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  componentDidMount(){
    document.title = "Admin"
  }
  render(){
    const { activeItem } = this.state
    const { url } = this.props.match
    return (
      <div className={styles['admin-container']}>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
            as={Link}
            to={url}
          />
          <Menu.Item
            name='questions'
            active={activeItem === 'questions'}
            onClick={this.handleItemClick}
            as={Link}
            to='/admin/questions'
          />
          <Menu.Item
            name='stats'
            active={activeItem === 'stats'}
            onClick={this.handleItemClick}
            as={Link}
            to='/admin/stats'
          />
          <Menu.Item
            name='users'
            active={activeItem === 'users'}
            onClick='/admin/users'
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={() => this.props.logoutAction()}
            />
          </Menu.Menu>
        </Menu>

        <Segment>
          <Route path="/" component={props => <h1>Home</h1>}/>
          <Route path="questions" component={props => <h1>questions</h1>}/>
          <Route path="stats" component={props => <h1>Stats</h1>}/>
          <Route path="users" component={props => <h1>Users</h1>}/>
          <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Segment>

      </div>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)