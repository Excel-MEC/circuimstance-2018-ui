import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Loadable from 'react-loadable'

import PrivateRoute from './utils/private-route'
import AdminRoute from './utils/admin-route'
import Loader from './utils/loader'
import Home from './pages/home'
import CallbackPage from './utils/callback-auth0'
// import AuthStore from './store/auth'
// import AuthActions from './actions/auth'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faAward, faTrophy, faRocket, faHourglassStart } from '@fortawesome/free-solid-svg-icons'

library.add(faAward,faTrophy,faRocket,faHourglassStart)

const LoginImport = () => import('./pages/login')
const DashboardImport = () => import('./pages/dashboard')
const AdminPageImport = () => import('./pages/admin')

const Login = Loadable({
  loader: LoginImport,
  loading: Loader
})

const Dashboard = Loadable({
  loader: DashboardImport,
  loading: Loader
})

const AdminPage = Loadable({
  loader: AdminPageImport,
  loading: Loader
})


class App extends Component {

  render() {
    return (
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <AdminRoute exact path="/admin" component={AdminPage}/>
          <Route exact path="/dashboard" component={Dashboard}/>
          <Route path="/callback" component={CallbackPage}/>
        </div>

    );
  }
}

export default App;
