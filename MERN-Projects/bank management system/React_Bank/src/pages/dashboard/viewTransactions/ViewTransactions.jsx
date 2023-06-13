import React, { useEffect, useState, useContext } from 'react'
import { collection, getDocs,query, where } from "firebase/firestore";
import { firestore } from 'Config/Firebase';
import { Link } from "react-router-dom"
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Rings } from "react-loader-spinner";
import { AuthenticatedContext } from 'Context/AuthenticatedContext';

function ViewTransactions() {
  const [documents, setDocuments] = useState([])   //key line for understanding these basic Hooks
  const [isLoading, setIsLoading] = useState(true)    
  const { user } = useContext(AuthenticatedContext)
  const [docId, setDocId] = useState("")
  const [transactionDetail, setTransactionDetail] = useState({})

  // console.log(user)

  // const createdBy = {
  //   email: user.email,
  //   uid: user.uid
  // }



  const handleClick = (doc) => setDocId(doc.id)
  const readDocs = async () => {

    let array = []

    const accountsRef = collection(firestore, "transactions");
    const q = query(accountsRef, where("createdBy.uid", "==", user.uid));
    const querySnapshot = await getDocs(q);  // Note: Key line for Reading data

    querySnapshot.forEach((doc) => {
      // console.log("doc", doc.data())
      // array.push(doc.data())
      // console.log(doc.data().createdBy.uid)
        array.push(doc.data())   //Also must Note this line
    });
    // console.log("querysnapShot=>", querySnapshot)
    // console.log(array)
    setDocuments(array)
    setIsLoading(false)
    // console.log(documents)
  }

  useEffect(() => {     //Note this point carefully also
    readDocs()
  }, [])

  useEffect(() => {
    documents.forEach((doc) => {
      if (doc.id === docId) {
        // console.log(doc)
        // console.log(docId)
        setTransactionDetail(doc)
        // console.log(transactionDetail)
        // console.log(doc)
        return
      }
    })
  }, [docId])

  return (
    <div className='viewTransactions'>
      <div className="container">
        <div className="row">
          <div className="col">
            <div class="card my-5 ">
              <div class="card-body " style={{ overflow: "auto" }}>
                {/* <div className="container"> */}
                <div className="row">
                  <div className="col text-start"><Link to="/dashboard" style={{ textDecoration: "none" }} className='btn-sm btn-danger text-white'><i class="fa-solid fa-arrow-left"></i> Dashboard</Link ></div>
                </div>
                <br />
                <div className="row">
                  <div className="col text-center"><h5><i class="fa-solid fa-money-bill-1"></i> Transactions</h5></div>
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
                          We don't have any Transaction yet!
                        </p>
                        <Link to="/dashboard/createAccounts" style={{ textDecoration: "none" }} className='btn-sm btn-success  text-center'>Create Account</Link>
                      </div>
                      :
                      <Table id="customers">
                        <Thead>
                          <Tr>
                            <Th>Transaction ID</Th>
                            <Th>Time</Th>
                            <Th>Date</Th>
                            <Th>Account ID</Th>
                            <Th>Type</Th>
                            <Th>Amount</Th>
                          </Tr>
                        </Thead>
                        <Tbody >
                          {
                            documents.map((doc, index) => {
                              return <>
                                <Tr key={index}>
                                  <Td>
                                    <div onClick={() => handleClick(doc)} className="btn btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ textDecoration: "none" }}>
                                      {doc.id}
                                    </div>
                                  </Td>

                                  <Td>{doc.dateCreated.toDate().toLocaleTimeString('en-US')}</Td>
                                  <Td>{doc.dateCreated.toDate().toDateString()}</Td>
                                  <Td>{doc.accountId}</Td>
                                  <Td>{doc.type}</Td>
                                  <Td>{doc.amount}</Td>
                                </Tr>
                              </>
                            })
                          }
                        </Tbody>
                      </Table>

                    }
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
                                  <p ><strong>Account Details of: </strong> {docId}</p>
                                </div>
                              </div>
                              <div className="row mt-3">
                                <div className="col">
                                  <strong className="h6">Account ID#</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail.accountId}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Account Holder Name#</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail.fullName}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Transaction Date</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail?.dateCreated?.toDate()?.toDateString()}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Transaction Time</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail?.dateCreated?.toDate()?.toLocaleTimeString('en-US')}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Transaction Type</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail.type}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Amount</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail.amount}</p>
                                </div>
                              </div>
                              <div className="row ">
                                <div className="col">
                                  <strong className="h6">Description</strong>
                                </div>
                                <div className="col ">
                                  <p>{transactionDetail.description}</p>
                                </div>
                              </div>
                              {/* <div className="row ">
                                <div className="col text-end">
                                  <button className='btn-sm btn-success me-2' data-bs-toggle="modal" data-bs-target="#exampleModal2">
                                    <i class="fa-solid fa-credit-card"></i> Deposit
                                  </button>
                                  <button className='btn-sm btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal3">
                                    <i class="fa-solid fa-angles-down"></i> Withdraw
                                  </button>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ViewTransactions