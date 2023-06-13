import React from 'react'
import './Header.css'
import { NavLink } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faM, faE, faR, faN } from '@fortawesome/free-solid-svg-icons'
function Header() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><em ><FontAwesomeIcon style={{ color: 'green', }} icon={faM} /><FontAwesomeIcon style={{ color: 'brown', }} icon={faE} /><FontAwesomeIcon style={{ color: 'red', }} icon={faR} /><FontAwesomeIcon style={{ color: 'blue', }} icon={faN} /></em></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto me-4">
                            <li class="nav-item">
                                <NavLink to="/" class="nav-link active text-light" aria-current="page" ><span className='text-light  me-2'> Add Order</span></NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink to="/ViewOrder" class="nav-link text-light"><span className='text-light '>View Order</span></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>



{/* 
            <nav className="navbar  navbar-dark bg-dark ">
                <div className="container-fluid">
                    <em ><FontAwesomeIcon style={{ color: 'green', }} icon={faM} /><FontAwesomeIcon style={{ color: 'brown', }} icon={faE} /><FontAwesomeIcon style={{ color: 'red', }} icon={faR} /><FontAwesomeIcon style={{ color: 'blue', }} icon={faN} /></em>
                    <span>
                        <NavLink to="/" className="navbar-brand  mb-0">Add Order</NavLink>
                        <NavLink to="/ViewOrder" className="navbar-brand  mb-0">View Order</NavLink>
                    </span>
                    <p className=' mb-0 text-white'>E-Commerce-App</p>
                </div>
            </nav> */}
        </div>
    )
}
export default Header;