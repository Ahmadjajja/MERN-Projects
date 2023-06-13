import React, { useEffect, useState, useContext } from 'react'
import { collection, getDocs, doc, deleteDoc, setDoc, serverTimestamp, query, where } from "firebase/firestore";
import { firestore } from 'Config/Firebase';
import { Link } from "react-router-dom"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Rings } from "react-loader-spinner";
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';

function ViewAccounts() {

  const [documents, setDocuments] = useState([])   //key line for understanding these basic Hooks
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useContext(AuthenticatedContext)
  const [docId, setDocId] = useState("")
  const [accountDetail, setAccountDetail] = useState({})
  const [isDepositAmount, setIsDepositAmount] = useState({ depositAmount: "0", description: "" })
  const [isWithdrawAmount, setIsWithdrawAmount] = useState({ withdrawAmount: "0", description: "" })

  const readDocs = async () => {

    let array = []

    const accountsRef = collection(firestore, "accounts");
    const q = query(accountsRef, where("createdBy.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);  // Note: Key line for Reading data

    querySnapshot.forEach((doc) => {
      // console.log(doc.data().userId)
      array.push(doc.data())   //Also must Note this line
    });

    setDocuments(array)
    setIsLoading(false)
    // console.log(documents)
  }

  useEffect(() => {     //Note this point carefully also
    readDocs()
  }, [])

  const handleClick = (doc) => {
    setAccountDetail(doc)
    setDocId(doc.id)
  }

  const handleDelete = async () => {
    // console.log("Deleting file", docId);
    // setIsLoading(true);
    await deleteDoc(doc(firestore, "accounts", docId));
    toast.success("Account Deleted Successfuly!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    let newDocuments = documents.filter((object) => {
      return docId !== object.id;
    })
    setDocuments(newDocuments)
    // setIsLoading(false);
  }

  const handleDepositChange = e => {
    setIsDepositAmount({ ...isDepositAmount, [e.target.name]: e.target.value })   //what does this line   Confusion!  
    // console.log(isDepositAmount)
  }

  const handleWithdrawChange = e => {
    setIsWithdrawAmount({ ...isWithdrawAmount, [e.target.name]: e.target.value })   //what does this line   Confusion!  
    // console.log(isWithdrawAmount)
  }


  const handleDeposit = async () => {

    let newDocument = documents.find((object) => {   // will store selected object using find method
      return docId == object.id;
    })

    const { depositAmount } = isDepositAmount //destructuring used here
    const { initialDeposit } = newDocument

    // console.log(withdrawAmount)
    if (parseInt(depositAmount) < 0) {
      // console.log(running)
      // alert("running")
      toast.error('Amount is not in correct format!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    newDocument.initialDeposit = (parseInt(initialDeposit) + parseInt(depositAmount)).toString();
    newDocument.description = isDepositAmount.description;

    // transaction code

    let transactionData = {
      amount: depositAmount,
      description: newDocument.description,
      dateCreated: serverTimestamp(),
      id: Math.random().toString(36).slice(2),
      accountId: docId,
      type: 'credit',
      fullName: newDocument.fullName,
      createdBy: {
        email: user.email,
        uid: user.uid
      }
    }
    // if(initialDeposit <= newDocument.initialDeposit){
    //   transactionData.type = 'debit';
    // }
    try {
      await setDoc(doc(firestore, "transactions", transactionData.id), transactionData)
      // console.log("Transaction done", transactionData)   
    } catch (err) {
      console.error(err)
    }




    let updatedArray = documents.filter(object => {

      if (docId === object.id) {
        // console.log(docId)
        return newDocument
      }
      return object
    })
    setDocuments(updatedArray)


    // console.log(depositAmount)
    // const docRef = doc(firestore, "accounts", docId);
    await setDoc(doc(firestore, "accounts", docId), newDocument);
    toast.success("Amount Deposited Successfuly!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }

  const handleWithdraw = async () => {


    
    let newDocument = documents.find((object) => {   // will store selected object using find method
      return docId == object.id;
    })
    
    // console.log(parseInt(isWithdrawAmount.withdrawAmount))



    const { withdrawAmount } = isWithdrawAmount //destructuring used here
    const { initialDeposit } = newDocument
    // console.log(withdrawAmount)
    if (parseInt(withdrawAmount) < 0) {
      // console.log(running)
      // alert("running")
      toast.error('Amount is not in correct format!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    

    // console.log(newDocument.initialDeposit)
    // console.log(withdrawAmount)
    if (parseInt(withdrawAmount) > parseInt(newDocument.initialDeposit)) {
      toast.error("Your account has insufficient balance", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    newDocument.initialDeposit = (parseInt(initialDeposit) - parseInt(withdrawAmount)).toString();
    newDocument.description = isWithdrawAmount.description;

    // transaction code

    let transactionData = {
      amount: withdrawAmount,
      description: newDocument.description,
      dateCreated: serverTimestamp(),
      id: Math.random().toString(36).slice(2),
      accountId: docId,
      type: 'debit',
      fullName: newDocument.fullName,
      createdBy: {
        email: user.email,
        uid: user.uid
      }
    }
    // if(initialDeposit <= newDocument.initialDeposit){
    //   transactionData.type = 'debit';
    // }
    try {
      await setDoc(doc(firestore, "transactions", transactionData.id), transactionData)
      console.log("Transaction done", transactionData)
    } catch (err) {
      console.error(err)
    }




    let updatedArray = documents.filter(object => {

      if (docId == object.id) {
        console.log(docId)
        return newDocument
      }
      return object
    })
    setDocuments(updatedArray)


    console.log(withdrawAmount)
    // const docRef = doc(firestore, "accounts", docId);
    await setDoc(doc(firestore, "accounts", docId), newDocument);
    toast.success("Amount Withdrawn Successfuly!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }

  return (
    <div className='viewAccount'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card my-5 md-5">
              <div className="card-body " style={{ overflow: "auto" }}>
                {/* <div className="container"> */}
                <div className="row ">
                  <div className="col text-start"><Link to="/dashboard" style={{ textDecoration: "none" }} className='btn-sm btn-danger text-white'><i className="fa-solid fa-arrow-left"></i> Dashboard</Link ></div>
                  {/* <div className="col text-end"><Link to="/dashboard/createAccounts" style={{ textDecoration: "none" }} className='btn-sm btn-success'><i className="fa-solid fa-plus"></i> Account</Link ></div> */}
                </div>
                <br />
                <div className="row">
                  <div className="col text-center"><h5><i className="fa-solid fa-user me-1"></i>Accounts</h5></div>
                </div>
                <hr />

                {isLoading
                  ? <div className="row">
                    <div className="col my-5 d-flex justify-content-center text-align-center">
                      <Rings />
                    </div>
                  </div>
                  : <>
                    {documents.length < 1
                      ? <div className='text-center my-5'>
                        <p >
                          We don't have any Account yet!
                        </p>
                        <Link to="/dashboard/createAccounts" style={{ textDecoration: "none" }} className='btn-sm btn-success  text-center'>Create Account</Link>
                      </div>
                      : <>
                        <Table id="customers">
                          <Thead>
                            <Tr>
                              <Th>Branch code</Th>
                              <Th>Account #</Th>
                              <Th>Name</Th>
                              <Th>Registered</Th>
                              <Th>Type</Th>
                              <Th>Balance</Th>
                            </Tr>
                          </Thead>
                          <Tbody >
                            {
                              documents.map((doc, i) => {
                                return <Tr key={i}>
                                  <Td>{doc.branchCode}</Td>
                                  {/* <!-- Button trigger modal --> */}
                                  {/* <Td  className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                      {doc.accountNumber}
                                    </Td> */}
                                  <Td>
                                    <div onClick={() => handleClick(doc)} className="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ textDecoration: "none" }}>
                                      {doc.accountNumber}
                                    </div>
                                  </Td>

                                  {/* Hello world */}

                                  <Td>{doc.fullName}</Td>
                                  <Td>{doc.date}</Td>
                                  <Td>{doc.accountType}</Td>
                                  <Td>{doc.initialDeposit}</Td>
                                  {/* <!-- Modal --> */}

                                </Tr>
                              })
                            }
                          </Tbody>
                        </Table>
                        {/* Account Detail Model */}
                        <div className="modal fade mt-3 " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div className="modal-dialog modal-dialog-scrollable">
                            <div className="modal-content">
                              <div className="modal-body p-1">
                                <div className="container">
                                  <div className="row mt-2">
                                    <div className="col">
                                      <button type="button" className="btn-sm btn-danger text-white" data-bs-dismiss="modal"><i className="fa-solid fa-arrow-left"></i> View All Accounts</button></div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <h5 >Account Details</h5>
                                    </div>
                                    <div className="col text-end">
                                      <button type="button" class="btn-sm btn-danger text-white" data-bs-toggle="modal" data-bs-target="#staticBackdrop4">
                                        <i className="fa-solid fa-trash"></i> Delete Account
                                      </button>
                                      {/* <button className="btn-sm btn-danger text-white" ><i className="fa-solid fa-trash"></i> Delete Account</button> */}
                                    </div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <strong className="h6">Branch Code</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.branchCode}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col">
                                      <strong className="h6">Account #</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.accountNumber}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col">
                                      <strong className="h6">Full Name</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.fullName}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col">
                                      <strong className="h6">Registerd</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.date}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col">
                                      <strong className="h6">Type</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.accountType}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col">
                                      <strong className="h6">Balance</strong>
                                    </div>
                                    <div className="col ">
                                      <p>{accountDetail.initialDeposit}</p>
                                    </div>
                                  </div>
                                  <div className="row ">
                                    <div className="col text-end">
                                      <button className='btn-sm btn-success me-2' data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                        <i class="fa-solid fa-credit-card"></i> Deposit
                                      </button>
                                      <button className='btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                        <i class="fa-solid fa-angles-down"></i> Withdraw
                                      </button>
                                      {/* <button className='btn-sm btn-success me-2'><i class="fa-solid fa-credit-card"></i> Deposit</button> */}
                                      {/* <button className='btn-sm btn-primary'><i class="fa-solid fa-angles-down"></i> Withdraw</button> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Deposit Model */}
                        <div class="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-body">
                                <div className="modal-body p-1">
                                  <div className="container">
                                    <div className="row mt-2">
                                      <div className="col">
                                        <button type="button" className="btn-sm btn-danger text-white" data-bs-dismiss="modal"><i className="fa-solid fa-arrow-left"></i> Back</button></div>
                                    </div>
                                    <div className="row mt-3">
                                      <div className="col">
                                        <h5 >Deposit Amount</h5>
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col">
                                        <div class="form-floating mb-3">
                                          <input type="number" class="form-control " id="floatingInput" name="depositAmount" placeholder='depositAmount' onChange={(event) => handleDepositChange(event)} required />
                                          <label for="floatingInput">Amount To Deposit</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mt-1">
                                      <div className="col">
                                        <div class="form-floating mb-3">
                                          <input type="text" class="form-control " id="floatingInput" name="description" placeholder='description' onChange={(event) => handleDepositChange(event)} required />
                                          <label for="floatingInput">Description</label>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="row mt-2">
                                      <div className="col text-end">
                                        <button className='btn-sm btn-success' data-bs-dismiss="modal" onClick={handleDeposit}><i class="fa-solid fa-angles-down"></i> Deposit</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Withdraw Model */}
                        <div class="modal fade" id="exampleModal3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-body">
                                <div className="container">
                                  <div className="row mt-2">
                                    <div className="col">
                                      <button type="button" className="btn-sm btn-danger text-white" data-bs-dismiss="modal"><i className="fa-solid fa-arrow-left"></i> Back</button></div>
                                  </div>
                                  <div className="row mt-3">
                                    <div className="col">
                                      <h5 >Withdraw Amount</h5>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col">
                                      <div class="form-floating mb-3">
                                        <input type="number" class="form-control " id="floatingInput" name="withdrawAmount" placeholder='AmountToWithdraw' onChange={(event) => handleWithdrawChange(event)} required />
                                        <label for="floatingInput">Amount To Withdraw (Max: {accountDetail.initialDeposit})</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-1">
                                    <div className="col">
                                      <div class="form-floating mb-3">
                                        <input type="text" class="form-control " id="floatingInput" name="description" placeholder='Decription' onChange={(event) => handleWithdrawChange(event)} required />
                                        <label for="floatingInput">Description</label>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row mt-2">
                                    <div className="col text-end">
                                      <button className='btn-sm btn-primary' data-bs-dismiss="modal" onClick={handleWithdraw}><i class="fa-solid fa-angles-down"></i> Withdraw</button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Delete Confirmation Model */}
                        <div class="modal fade p-0" id="staticBackdrop4" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" style={{ width: "360px", height: "300px" }}>
                            <div class="modal-content">
                              {/* <div class="modal-header"> */}

                              {/* </div> */}
                              <div class="modal-body">
                                <div className="container my-4">
                                  <div className="row">
                                    <div className="col"><h6 >Are you sure you want to delete your Bank Account?</h6></div>
                                  </div>
                                  <div className="row text-end mt-3">
                                    <div className="col">
                                      <button type="button" class="btn-sm btn-success me-2" data-bs-dismiss="modal">
                                        <i class="fa-solid fa-xmark"></i> NO
                                      </button>
                                      <button onClick={handleDelete} className='btn-sm btn-danger me-2' data-bs-dismiss="modal">
                                        <i className="fa-solid fa-trash"></i> YES
                                      </button>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewAccounts