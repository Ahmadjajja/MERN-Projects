import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Frontend from "./FrontEnd"
import Dashboard from './dashboard';
import Login from "./Authentication/Login"
import SignUp from "./Authentication/Signup"
import ForgotPassword from './Authentication/ForgotPassword';
import NoPage from "./NoPage"
import PrivateRoute from './important/PrivateRoute';
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
// import { useNavigate } from 'react-router-dom';

function CustomRoutes() {

    const { isAuthenticated } = useContext(AuthenticatedContext);
    // console.log(isAuthenticated)
    // const Navigate = useNavigate();

    return (
        <BrowserRouter>
            {/* <Header /> */}
            {/* <main> */}
            <Routes>
                <Route path='/' element={< Frontend />} />
                <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
                <Route path='/signUp' element={<SignUp />} />
                <Route path='/forgotPassword' element={<ForgotPassword />} />
                <Route path='/dashboard/*' element={<PrivateRoute Component={Dashboard} />} />
                <Route path='*' element={<NoPage />} />
            </Routes>
            {/* </main> */}
            {/* <Footer /> */}

        </BrowserRouter>
    )
}

export default CustomRoutes;