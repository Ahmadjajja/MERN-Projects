import { useContext } from "react";
import "./App.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import CustomRoutes from "./pages/Routes";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { AuthenticatedContext } from "Context/AuthenticatedContext";
import ScreenLoader from "components/ScreenLoader"

function App() {

  const { isAuthenticated, isLoader } = useContext(AuthenticatedContext)

  // console.log(isAuthenticated)
  // console.log(isLoader)

  return (
    <>
      {isLoader
        ? <ScreenLoader />
        : <CustomRoutes />
      }
      <ToastContainer />
    </>
  );
}

export default App;
