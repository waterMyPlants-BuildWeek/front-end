import React, { useContext, useState, useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/Auth'

const PrivateRoute = ({component: RouteComponent, ...rest}) => {

    const { currentUser, state } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={routeProps => 
                // localStorage.getItem("userToken")
                state.isAuthenticated
                ? (<RouteComponent {...routeProps} />)
                : (<Redirect to={'/login'} />)
            }      
        />
    )
}

export default PrivateRoute
