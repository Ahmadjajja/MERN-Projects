import React, { useReducer, useEffect, useState } from 'react';
import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-community/async-storage';


import AuthReducer from '../reducers/Auth.reducer';
import { setCurrentUser } from '../actions/Auth.actions';
import AuthGlobal from "./AuthGlobal"

const Auth = props => {
    const [stateUser, dispatch] = useReducer(AuthReducer, {
        isAuthenticated: null,
        user: {}
    });
    // dispatch works like setState
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        console.log(" AsyncStorage.jwt=>",  AsyncStorage.jwt)
        setShowChild(true);
        if (AsyncStorage.jwt) {
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentUser(jwt_decode(decoded)))
            }
        }
        return () => setShowChild(false)
    }, [])

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        )
    }
}

export default Auth;