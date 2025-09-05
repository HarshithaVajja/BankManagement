import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/adminLoans.css'
import axios from 'axios';

const AdminLoans = () => {

    const [loans, setLoans] = useState([]);

    useEffect(()=>{
        fetchLoans();
    },[]);

    const fetchLoans = async () =>{
        await axios.get('http://localhost:6001/fetch-loans').then(
            (response) =>{
                setLoans(response.data);
                console.log(response.data);
            }
        )
    }

    const approveLoan = async(id) =>{
        await axios.put('http://localhost:6001/approve-loan', {id}).then(
            (response)=>{
                alert("Loan approved!!");
                fetchLoans();
            }
        )
    }
    const declineLoan = async(id) =>{
        console.log(id)
        await axios.put('http://localhost:6001/decline-loan', {id}).then(
            (response)=>{
                alert("Loan Declined!!");
                fetchLoans();
            }
        )
    }

  return (
    <>
      <Navbar />


      <div className="loans-page">
          <div className="loans">
              <h2>All loans</h2>
              <div className="loans-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'flex-start' }}>
                {loans.map((loan)=>{
                  return(
                    <div className="loan" key={loan._id} style={{ background: 'var(--surface)', borderRadius: '18px', boxShadow: 'var(--shadow)', padding: '2rem 1.5rem', minWidth: '320px', maxWidth: '400px', flex: '1 1 340px', borderLeft: '8px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                      <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700 }}>Loan type:</span> {loan.loanType}
                      </p>
                      <p style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                        <span style={{ fontWeight: 700 }}>Balance:</span> {loan.balance}
                      </p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Duration:</span> {loan.duration} months</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Start Date:</span> {loan.createdDate ? loan.createdDate.slice(0,10) : 'N/A'}</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Nominee name:</span> {loan.nomineeName}</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Total amount:</span> {loan.loanAmount}</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Customer name:</span> {loan.customerName}</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Customer A/c id:</span> {loan.customerId}</p>
                      <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>{loan.loanStatus === 'approved' ? 'End Date:' : 'Loan status:'}</span> {loan.loanStatus === 'approved' ? loan.endDate : loan.loanStatus}</p>
                    </div>
                  )
                })}
              </div>
          </div>
          <div className="loan-requests-container">
              <h3>Pending Applications</h3>
              <div className="loan-requests">
                  {loans.filter(loan=> loan.loanStatus === 'pending').map((loan)=>{
                    return(
                      <div className="loan-request" key={loan._id}>
                          <p><b>Loan type: </b>{loan.loanType}</p>
                          <p><b>Customer name: </b>{loan.customerName}</p>
                          <p><b>Customer A/c id: </b>{loan.customerId}</p>
                          <p><b>Amount: </b>{loan.loanAmount}</p>
                          <p><b>Duration: </b>{loan.duration} months</p>
                          <span>
                              <button className="btn btn-primary" onClick={()=> approveLoan(loan._id)}>Approve</button>
                              <button className="btn btn-danger" onClick={()=> declineLoan(loan._id)}>Decline</button>
                          </span>
                      </div>
                    )
                  })}
              </div>
          </div>
      </div>


    </>
  )
}

export default AdminLoans