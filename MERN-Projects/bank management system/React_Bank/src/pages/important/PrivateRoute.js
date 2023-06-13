import React, { Component, useContext } from 'react'
import { AuthenticatedContext } from '../../Context/AuthenticatedContext'
import Login from "../Authentication/Login"

export default function PrivateRoute({ Component }) { //component here is in destructuring form

    const { isAuthenticated } = useContext(AuthenticatedContext)
    // console.log(props)
    console.log(isAuthenticated)

    if (!isAuthenticated)
        return <Login />

    return (
        <Component />
    )
}