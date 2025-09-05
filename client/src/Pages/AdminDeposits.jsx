import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/adminDeposits.css'
import axios from 'axios';

const AdminDeposits = () => {

  const [deposits, setDeposits] = useState([]);

  useEffect(()=>{
    fetchDeposits();
  },[]);

  const fetchDeposits = async () =>{
    await axios.get('http://localhost:6001/fetch-deposits').then(
      (response) =>{
        setDeposits(response.data);
      }
    )
  }

  return (
    <>
      <Navbar />

      <div className="deposits card container" style={{ marginTop: '2rem', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow)', background: 'var(--surface)', paddingTop: '12vh' }}>
        <h2 style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '2rem' }}>All Deposits</h2>
        <div className="deposits-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'flex-start' }}>
          {deposits.map((deposit) => (
            <div className="deposit card" key={deposit._id} style={{ background: 'var(--surface)', borderRadius: '18px', boxShadow: 'var(--shadow)', padding: '2rem 1.5rem', minWidth: '320px', maxWidth: '400px', flex: '1 1 340px', borderLeft: '8px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700 }}>Deposit name:</span> {deposit.depositName}
              </p>
              <p style={{ fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700 }}>Amount:</span> {deposit.amount}
              </p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Duration:</span> {deposit.duration} months</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Start Date:</span> {deposit.createdDate ? deposit.createdDate.slice(0,10) : 'N/A'}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Nominee name:</span> {deposit.nomineeName}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Nominee age:</span> {deposit.nomineeAge}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Customer name:</span> {deposit.customerName}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Customer A/c id:</span> {deposit.customerId}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Mature Date:</span> {deposit.matureDate}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default AdminDeposits