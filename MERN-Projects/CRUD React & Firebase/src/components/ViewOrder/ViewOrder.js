import React, { useEffect, useState } from "react"
import './ViewOrder.css'
import axios from "axios"
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function ViewOrder() {
  // const navigate = useNavigate();
  const [documents, setDocuments] = useState([])
  const [updatingData, setUpdatingData] = useState({
    product: "",
    company: "",
    price: ""
  })
  const [docForEdit, setDocForEdit] = useState({});
       //Deployment Related line Understand CareFully
  //get Data
  useEffect(() => {
    axios.get(`${URL}/getUsers`)    //get then catch uses for getting and handling data
      .then((res) => {
        console.log("get user code up and running")
        setDocuments(res.data)
        console.log(res.data)
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

const handleChange = e => {
  setUpdatingData(s => ({ ...s, [e.target.name]: e.target.value }))   //what does this line   Confusion!  
}
const handleUpdateDoc = doc =>setDocForEdit(doc);
  
  const handleUpdate = (e) => {
  e.preventDefault();
  // console.log(docForEdit);
  let doc = {...docForEdit};
  // console.log(doc);
  console.log("Update data code is up and running")
  let current = new Date();
    let formData = { ...updatingData }     //confusion
    // alert(formData)\\
    // console.log(formData)
    let newData = { id: doc._id, product: formData.product, company: formData.company, price: formData.price, date: current.toLocaleDateString(), time: current.toLocaleTimeString() }


    // console.log(newData)


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
      // navigate("/ViewOrder");
  }





  return (
    <div className="ListContainer pb-5">
      <h1 className="text-center mt-2">Order List</h1>
      <div className="card text-center container mt-4 pb-3">

        <table>
          <tr>
            <th>Order</th>
            <th>Product</th>
            <th>Company</th>
            <th>Price</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
          {documents.map((doc, i) => {
            return <tr key={i} >
              <td >{i + 1}</td >
              <td >{doc.product}</td >
              <td >{doc.company}</td >
              <td >{doc.price} PKR</td >
              <td >{doc.date}</td >
              <td >{doc.time}</td >
              <td >
                <button  type="button" class="btn btn-dark " style={{color:"#dddd",}}  ><FiEdit2 onClick={() => { handleUpdateDoc(doc) }} data-bs-toggle="modal" data-bs-target="#exampleModal" /> </button>&ensp;
                <button onClick={() => { handleDelete(doc) }} className="btn btn-danger"><RiDeleteBinLine /></button>
              </td >
              <hr />
            </tr>
          })}
        </table>
        {/* <!-- Button trigger modal --> */}
{/* <!-- Modal --> */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-body container">
        <div className="card text-center  pb-3  pt-3 container w-50">
          <h3 className="text-center">Update Order</h3>
          <form onSubmit={handleUpdate} className="mt-2 ">
            <input type="text" id='product' name='product' placeholder='Enter product Name' value={updatingData.product}  onChange={handleChange}/><br /><br />
            <input type="text" id='company' name='company' placeholder='Enter Company Name' value={updatingData.company}  onChange={handleChange}/><br /><br />
            <input type="text" id='price' name='price' placeholder='Enter price' value={updatingData.price}  onChange={handleChange}/><br /><br />
            <input type="submit" className="login-btn bg-dark text-white" id="button" value="Update" />
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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