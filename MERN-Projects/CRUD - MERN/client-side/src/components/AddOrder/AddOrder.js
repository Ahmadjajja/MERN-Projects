import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import './AddOrder.css'
import { toast } from "react-toastify";
function AddOrder() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    product: "",
    company: "",
    price: "",
    date:"",
    time:""
  })
  const URL = process.env.REACT_APP_API_END_POINT
  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))   //what does this line   Confusion!  
  }

  //Add Data

  const handleSubmit = e => { 

    e.preventDefault();
    console.log("Add data code is up and running")
  let current = new Date();
  const date = current.toLocaleDateString();
  const time = current.toLocaleTimeString() ;
    //functions for getting date and time
    state.date = date;
    state.time = time;
    // console.log(state.date)
    // console.log(state.time)
    let formData = { ...state, }     //confusion
    // alert(formData)
    console.log(formData)
    // formData.age = Number(formData.age)
    axios.post(`${URL}/createUser`, formData)
      .then(() => {
        toast.success("Order added Succesfullty!", {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch(err => {
        toast.error(err, { 
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
    // console.log(formData)
    navigate("/ViewOrder");
  }
  return (
    <div >
      <div className="card text-center mt-5 pb-5 pt-3 container w-50">
      <h1 className="text-center">Add Order</h1>
        <form onSubmit={handleSubmit} className="mt-2 " >
          <input type="text" id='product' name='product' placeholder='Enter product Name' onChange={handleChange} /><br /><br />
          <input type="text" id='company' name='company' placeholder='Enter Company Name' onChange={handleChange} /><br /><br />
          <input type="text" id='price' name='price' placeholder='Enter price' onChange={handleChange} /><br /><br />
          <input type="submit" className="login-btn bg-dark text-white" id="button" value="Add Order" />
        </form>
      </div>
    </div>
  )
}
export default AddOrder;