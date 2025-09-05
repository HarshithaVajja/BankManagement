import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/admin.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [depositsCount, setDepositsCount] = useState(0);
  const [loansCount, setLoansCount] = useState(0);


  useEffect(()=>{

    fetchData();
  }, [])

  const fetchData = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        
        setUserCount(response.data.length);
        
      }
    );
    await axios.get('http://localhost:6001/transactions').then(
      (response)=>{
        setTransactionCount(response.data.length);
      }
    );
    await axios.get('http://localhost:6001/fetch-deposits').then(
      (response)=>{
        setDepositsCount(response.data.length);
      }
    );
    await axios.get('http://localhost:6001/fetch-loans').then(
      (response)=>{
        setLoansCount(response.data.length);
      }
    );
  }

  return (
    <>
      <Navbar />
      <div className="admin-page">
        <div className="admin-dashboard-cards">
          <div className="card admin-card users-card" style={{ background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', borderLeft: '6px solid var(--primary)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Users</h4>
            <p style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}> {userCount} </p>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={()=>navigate('/all-users')}>View all</button>
          </div>
          <div className="card admin-card transactions-card" style={{ background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', borderLeft: '6px solid var(--secondary)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Transactions</h4>
            <p style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}> {transactionCount} </p>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={()=>navigate('/all-transactions')}>View all</button>
          </div>
          <div className="card admin-card deposits-card" style={{ background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', borderLeft: '6px solid var(--primary)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Deposits</h4>
            <p style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}> {depositsCount} </p>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={()=>navigate('/all-deposits')}>View all</button>
          </div>
          <div className="card admin-card loans-card" style={{ background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', borderLeft: '6px solid var(--secondary)' }}>
            <h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Loans</h4>
            <p style={{ fontSize: '2rem', color: 'var(--secondary)', fontWeight: 700 }}> {loansCount} </p>
            <button className="btn" style={{ marginTop: '1rem' }} onClick={()=>navigate('/all-loans')}>View all</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin