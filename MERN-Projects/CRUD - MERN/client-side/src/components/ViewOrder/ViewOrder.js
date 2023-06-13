import React, { useEffect, useState } from "react"
import './ViewOrder.css'
import axios from "axios"
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { BallTriangle } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

function ViewOrder() {
const navigate = useNavigate();
const [documents, setDocuments] = useState([])
const [isLoading,setIsLoading] =useState(false)
const [updatingData, setUpdatingData] = useState({
  product: "",
  company: "",
  price: ""
})
const [docForEdit, setDocForEdit] = useState({});
const URL = process.env.REACT_APP_API_END_POINT       //Deployment Related line Understand CareFully
//get Data
useEffect(() => {
  axios.get(`${URL}/getUsers`)    //get then catch uses for getting and handling data
    .then((res) => {
      console.log("get user code up and running")
      setDocuments(res.data)
      console.log(res.data)
      setIsLoading(true)
    })
    .catch((err) => { 
      console.error(err)
    })
}, [])


//delete data

const handleDelete = doc => {
  console.log(doc)

  const { _id } = doc    //what does mean this line?

  axios.delete(`${URL}/deleteUser/${_id}`)
    .then((res) => {
      console.log("User deleted Message from client side")
      console.log("message from server", res.data)
      toast.success("Order Cancelled Succesfullty!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      let newDocuments = documents.filter((document) => {
        return document._id !== _id
      })
      setDocuments(newDocuments)
    }).catch((err) => {
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
    }).finally(() => {
      // console.log("finally worked")
    })
}


//update data


const handleUpdateDoc = (doc) => setDocForEdit(doc);


const handleUpdate = (item) => {
item.preventDefault();
console.log(item)
let current = new Date();
  // console.log("product=>"+item.target[0].value)
  // console.log("company=>"+item.target[1].value)
  // console.log("price=>"+item.target[2].value)
  let newData = { id: docForEdit._id, product: item.target[0].value, company: item.target[1].value, price: item.target[2].value, date: current.toLocaleDateString(), time: current.toLocaleTimeString() }
  axios.put(`${URL}/updateUser`, newData)
    .then((res) => {
      console.log("message from server", res.data)
      let newDocuments = documents.map((document) => {
        console.log(document)
        return (document._id === newData.id) ? newData : document;
      })
      console.log("new Documents => " + newDocuments)
      setDocuments(newDocuments)

      toast.success("Order Updated Succesfullty!", {
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
    .catch((err) => {
      console.error(err)
    })
    navigate("/ViewOrder");
}





return (
  <div className="ListContainer pb-5">
    <h1 className="text-center mt-2">Order List</h1>
    <div className="card text-center container mt-4 pb-3 " style={{minWidth:'700px'}}>

      <table>
<thead>

        <tr>
          <th>Order</th>
          <th>Product</th>
          <th>Company</th>
          <th>Price</th>
          <th>Date</th>
          <th>Time</th>
          <th>Actions</th>
        </tr>
</thead>
<tbody>

        {documents.map((doc, i) => {
          return <tr key={i} >
            <td >{i + 1}</td >
            <td >{doc.product}</td >
            <td >{doc.company}</td >
            <td >{doc.price} PKR</td >
            <td >{doc.date}</td >
            <td >{doc.time}</td >
            <td >
              <button  type="button"onClick={() => { handleUpdateDoc(doc) }} data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-dark " style={{color:"#dddd",}}  ><FiEdit2   /> </button>&ensp;
              <button onClick={() => { handleDelete(doc) }} className="btn btn-danger"><RiDeleteBinLine /></button>
            </td >
          </tr>
        })}
        </ tbody>
      </table>
{(isLoading == false) &&
      <div className="mx-auto mt-5 mb-5 pt-5 pb-5">
      <BallTriangle 
heigth="100"
width="100"
color="grey"
ariaLabel="loading-indicator"
/>
</div>
}

      {/* <!-- Button trigger modal --> */}
{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-body container">
      <div className="card text-center  pb-3  pt-3 container ">
        <h3 className="text-center">Update Order</h3>
        <form onSubmit={(item)=> handleUpdate(item)} className="mt-2 ">
          <input type="text" id='product' name='product' placeholder='Enter product Name' defaultValue={docForEdit.product}  /><br /><br />
          <input type="text" id='company' name='company' placeholder='Enter Company Name' defaultValue={docForEdit.company}   /><br /><br />
          <input type="text" id='price' name='price' placeholder='Enter price' defaultValue={docForEdit.price}  /><br /><br />
          <input type="submit" className="login-btn bg-dark text-white" id="button" value="Update" />
        </form>
      </div>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    </div>
  </div>
</div>
</div>
    </div>
  </div >
)
}
export default ViewOrder;

// function UpdateModel() {
//   return (
//     <div>
    
//     </div>
//   )
// }