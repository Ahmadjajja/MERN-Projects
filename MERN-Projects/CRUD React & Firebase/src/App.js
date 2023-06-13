import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import AddOrder from "./components/AddOrder/AddOrder";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Routing from "./components/routing/Routing";
function App() {

//How to Add Validation In FormHandling

  return (
    <div id='addOrderWholePage' >
      <Header />
      <Routing/>
      <Footer/>
      <ToastContainer />
    </div>
  )
}

export default App
