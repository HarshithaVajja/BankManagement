import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/allTransactions.css'
import axios from 'axios';

const AllTransactions = () => {

  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    fetchDeposits();
  },[]);

  const fetchDeposits = async () =>{
    await axios.get('http://localhost:6001/transactions').then(
      (response) =>{
        setTransactions(response.data.reverse());
      }
    )
  }

  return (
    <>
      <Navbar />

      <div className="all-transactions-page">

          <h2>All Transactions</h2>

          <div className="all-transactions-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'flex-start' }}>

            {transactions.map((txn) => (
              <div className="transaction-card" key={txn._id} style={{ background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', padding: '2rem', minWidth: '320px', maxWidth: '400px', flex: '1 1 340px', borderLeft: '6px solid var(--secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                <p style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700 }}>Amount:</span> {txn.amount}
                </p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Sender:</span> {txn.senderName}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Receiver:</span> {txn.receiverName}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Sender's a/c id:</span> {txn.senderId}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Receiver's a/c id:</span> {txn.receiverId}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Receiver IFSC:</span> {txn.receiverIFSC}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Payment method:</span> {txn.paymentMethod}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Time:</span> {txn.time}</p>
                <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Remarks:</span> {txn.remarks}</p>
              </div>
            ))}

              
              
          </div>
      </div>

    </>
  )
}

export default AllTransactions