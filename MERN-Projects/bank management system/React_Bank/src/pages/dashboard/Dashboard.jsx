import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from 'Config/Firebase';
import { AuthenticatedContext } from 'Context/AuthenticatedContext';
import { Rings } from "react-loader-spinner";
// import { collection, getDocs,query, where } from "firebase/firestore";
function Dashboard() {
  const { user } = useContext(AuthenticatedContext)
  const [totalAccounts, setTotalAccounts] = useState(0)
  const [totalTransactions, setTotalTransactions] = useState(0)
  const [totalCredit, setTotalCredit] = useState(0)
  const [totalDebit, setTotalDebit] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const readDocs = async () => {

    let arrayAccounts = []
    let arrayTransactions = []

    //accounts

    const accountsRef = collection(firestore, "accounts");
    const qa = query(accountsRef, where("createdBy.uid", "==", user.uid));
    const querySnapshotaccounts = await getDocs(qa);  // Note: Key line for Reading data

    //transactions

    const transactionsRef = collection(firestore, "transactions");
    const qt = query(transactionsRef, where("createdBy.uid", "==", user.uid));
    const querySnapshottransactions = await getDocs(qt);  // Note: Key line for Reading data

    querySnapshotaccounts.forEach((doc) => {
      // console.log(doc.data().userId)
      arrayAccounts.push(doc.data())   //Also must Note this line
    });
    let credit = 0;
    let debit = 0;
    querySnapshottransactions.forEach((doc) => {
      // console.log("doc", doc.data())
      // array.push(doc.data())
      // console.log(doc.data().createdBy.uid)
      arrayTransactions.push(doc.data())   //Also must Note this line
      if (doc.data().type === "credit") {
        credit = credit + parseInt(doc.data().amount)
        // console.log("credit" ,credit)
      } else {
        debit = debit + parseInt(doc.data().amount)
        // console.log("debit" ,debit)
      }
    });
    setTotalCredit(credit)
    setTotalDebit(debit)

    // setDocuments(arrayAccounts)
    // setIsLoading(false)
    // console.log(arrayAccounts)
    // console.log(arrayTransactions)
    setTotalAccounts(arrayAccounts.length)
    setTotalTransactions(arrayTransactions.length)
    setIsLoading(false)
  }

  useEffect(() => {     //Note this point carefully also
    readDocs()
  }, [])

  return (
    <div className='dashboardPage'>
      <div className='container py-5'>
        <div class="row">
          <div class="col-12  col-lg-6 mt-2">
            <div class="card pb-4">
              <div class="card-body text-center">
                <h5 class="card-title"><i class="fa-solid fa-user"></i> Accounts</h5>
                <hr />
                <Link to="/dashboard/createAccounts" className='btn btn-success mt-2 me-2 mb-0 h5' ><i class="fa-solid fa-plus"></i> Add New Account</Link>
                <Link to="/dashboard/viewAccounts" className='btn btn-info mt-2 me-2 mb-0 h5 text-white'><i class="fa-solid fa-eye"></i> View All Accounts</Link>
                <hr />
                {isLoading
                  ? <div className="row">
                    <div className="col d-flex justify-content-center ">
                      <Rings />
                    </div>
                  </div>
                  : <div className='my-4'>
                    {totalAccounts}
                  </div>
                }
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 mt-2">
            <div class="card">
              <div class="card-body text-center">
                <h5 class="card-title "><i class="fa-solid fa-money-bill-1"></i> Transactions</h5>
                <hr />
                <Link to="/dashboard/viewTransactions" className='btn btn-info mt-2 me-2 h5 text-white'><i class="fa-solid fa-eye"></i> View All Transactions</Link>
                <hr />
                {isLoading
                  ? <div className="row">
                    <div className="col d-flex justify-content-center ">
                      <Rings className="w-50"/>
                    </div>
                  </div>
                  : <div className='my-4'>
                    {totalTransactions}
                    {/* <p>Transactions</p> */}
                    <div className="container-fluid">
                      <div className="row ">
                        <div className="col text-start mb-0 " ><p className='TC'> Total Credits Rs:<span className='text-success'>{totalCredit}</span></p></div>
                        <div className="col text-end mb-0 " ><p className='TD'> Total Debits Rs:<span className='text-danger'>{totalDebit}</span></p></div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard