import React, { useContext } from 'react'
import '../styles/navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {

    const navigate = useNavigate();
    const usertype = localStorage.getItem('userType');

    const {logout} = useContext(GeneralContext);

    return (
        <div className="navbar">
            {usertype === 'customer' ? (
                <>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem', letterSpacing: '2px' }}>Neo Bank</h3>
                    <div className="nav-options" style={{ display: 'flex', gap: '2rem' }}>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/home')}>Home</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/deposits')}>Deposits</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/loans')}>Loans</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/transactions')}>Transactions</p>
                        <p className="nav-link" style={navLinkStyle} onClick={logout}>Logout</p>
                    </div>
                </>
            ) : usertype === 'admin' ? (
                <>
                    <h3 style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem', letterSpacing: '2px' }}>Neo Bank (Admin)</h3>
                    <div className="nav-options" style={{ display: 'flex', gap: '2rem' }}>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/admin')}>Home</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/all-users')}>Users</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/all-deposits')}>Deposits</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/all-loans')}>Loans</p>
                        <p className="nav-link" style={navLinkStyle} onClick={()=>navigate('/all-transactions')}>Transactions</p>
                        <p className="nav-link" style={navLinkStyle} onClick={logout}>Logout</p>
                    </div>
                </>
            ) : null}
        </div>
    );
}

// Modern nav link style
const navLinkStyle = {
    color: 'var(--surface)',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1.1rem',
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    transition: 'background 0.2s',
};

export default Navbar