import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { connect } from 'react-redux'

const mapStateToProps = state =>({
    authenticated: state.auth.authenticated,
    admin: state.auth.admin,
})

const mapDispatchToProps = dispatch => ({

})


const AdminRoute = ({
    component,
    authenticated,
    admin,
    ...rest
}) => {
    const Component = component
    return <Route {...rest} render={props => authenticated && admin?<Component/>:<Redirect to="/login"/>} />
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdminRoute)