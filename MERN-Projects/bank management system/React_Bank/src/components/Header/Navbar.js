import React, {useContext} from 'react'
import { Link } from "react-router-dom"
import { auth } from '../../Config/Firebase';
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthenticatedContext } from '../../Context/AuthenticatedContext';
function Navbar() {
    const {isAuthenticated, setIsAuthenticated,setCountAccount,setCountTransaction}= useContext(AuthenticatedContext);
    const handleClick = () => {
        

        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('User has been logged Out!', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
            setIsAuthenticated(false)
            // setCountAccount(0)
            // setCountTransaction(0)
        }).catch((error) => {
            // An error happened.
            // console.log(error)
            toast.error(error.message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }
    return (
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark " style={{ zIndex: '1000' }} > {/* navbar 2 */}
                <div class="container">
                    <Link class="navbar-brand h1 " to="/">BANK-APP</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse " id="navbarSupportedContent">
                        {/* <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto">
                            <li class="nav-item">

                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul> */}
                        {/* <div class="nav-item"> */}
                        {!isAuthenticated
                        ?<Link type="button" class="btn btn-light ms-auto " to="/login">Login</Link>
                        :<div className='ms-auto'>
                        <Link type="button" class="btn btn-light me-2" to="/dashboard">Dashboard</Link>
                        <button type="button" class="btn btn-danger text-white" onClick={handleClick}>Logout</button>   
                        </div>
                        }
                        {/* </li> */}
                    </div>
                    
                </div>
            </nav>
        </header>
    )
}

export default Navbar