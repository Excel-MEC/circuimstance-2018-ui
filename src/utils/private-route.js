import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { connect } from 'react-redux'

const mapStateToProps = state =>({
    authenticated: state.auth.authenticated
})

const mapDispatchToProps = dispatch => ({

})


const PrivateRoute = ({
    component,
    authenticated,
    ...rest
}) => {
    const Component = component
    return <Route {...rest} render={props => authenticated?<Component/>:<Redirect to="/login"/>} />
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PrivateRoute)