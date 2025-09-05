import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/allUsers.css'
import axios from 'axios';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers();
  },[]);

  const fetchUsers = async () =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response) =>{
        setUsers(response.data);
      }
    )
  }

  return (
    <>
      <Navbar />

      <div className="all-users-page">
        <h2>All users</h2>
        <div className="all-users-body" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'flex-start' }}>

          {users.map((user) => (
            <div className="user-card" key={user._id} style={{ background: 'var(--surface)', borderRadius: '18px', boxShadow: 'var(--shadow)', padding: '2rem 1.5rem', minWidth: '320px', maxWidth: '400px', flex: '1 1 340px', borderLeft: '8px solid var(--primary)', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700 }}>Username:</span> {user.username}
              </p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>A/c id:</span> {user._id}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>IFSC:</span> {user.ifsc}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Email:</span> {user.email}</p>
              <p><span style={{ fontWeight: 700, color: 'var(--primary)' }}>Balance:</span> {user.balance}</p>
            </div>
          ))}
        </div>
    </div>
    </>
  )
}

export default AllUsers