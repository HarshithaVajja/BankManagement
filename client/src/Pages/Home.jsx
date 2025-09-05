
import React, { useEffect, useState } from 'react';
import '../styles/home.css';
import Navbar from '../components/Navbar';
import axios from 'axios';


const Home = () => {
	const username = localStorage.getItem('username');
	const userid = localStorage.getItem('userId');
	const ifsc = localStorage.getItem('IFSC');
	const homeBranch = localStorage.getItem('homeBranch');

	const [balance, setBalance] = useState(0);
	const [sendingAmount, setSendingAmount] = useState(0);
	const [sendingIFSC, setSendingIFSC] = useState();
	const [sendingMethod, setSendingMethod] = useState();
	const [sendingAcId, setSendingAcId] = useState();
	const [sendingRemarks, setSendingRemarks] = useState('');
	const [transactions, setTransactions] = useState([]);

	useEffect(()=>{
		fetchUserData();
	}, [])

	const fetchUserData = async () => {
		try{
				if (userid) {
						await axios.get(`http://localhost:6001/user-details/${userid}`).then(
							async (response) => {
								setBalance(response.data.balance);
							}
						).catch((err)=>{
							console.log(err);
						});
						await axios.get(`http://localhost:6001/transactions`).then(
							async (response) => {
								setTransactions(response.data.reverse());
							}
						).catch((err)=>{
							console.log(err);
						});
					}
		}catch(err){
				console.log(err);
		}
	}

	const sendMoney = async (e) =>{
		e.preventDefault();
		const sendTransactionData = {senderId: userid, senderName: username, 
																		receiverId: sendingAcId, remarks: sendingRemarks, receiverIFSC: sendingIFSC, 
																		amount: sendingAmount, paymentMethod: sendingMethod, time: new Date()};
		if (sendingAmount <= balance){
				await axios.post('http://localhost:6001/send-money', sendTransactionData).then(
					async (response) =>{
						alert("transaction successful");
						setSendingAcId();
						setSendingIFSC();
						setSendingMethod('');
						setSendingAmount(0);
						setSendingRemarks('');
						fetchUserData();
					}
				).catch((err)=>{
					alert("Transaction failed!!");
				})
			}else{
				alert("No sufficient balance");
			}
	}

	return (
		<>
			<Navbar />
			<div className="home-page container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
				<div className="home-user-data card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', padding: '2rem', background: 'var(--surface)', borderLeft: '8px solid var(--primary)', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
					<div>
						<p style={{ fontWeight: 600, color: 'var(--primary)' }}><b>User:</b> {username} </p>
						<p style={{ color: 'var(--text)' }}><b>Account ID:</b> {userid} </p>
					</div>
					<div>
						<p style={{ fontWeight: 600, color: 'var(--primary)' }}><b>IFSC code:</b> {ifsc} </p>
						<p style={{ color: 'var(--text)' }}><b>Home Branch:</b> {homeBranch} </p>
					</div>
				</div>
				<div className="home-body" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
					<div className="home-container1 card" style={{ flex: 1, minWidth: '350px', background: '#fff', borderRadius: '18px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', borderLeft: '6px solid #0057b7', padding: '2rem', marginBottom: '2rem' }}>
						<div className="balance-container" style={{ marginBottom: '2rem', textAlign: 'center' }}>
							<h4 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.5rem' }}>Account Balance</h4>
							<p style={{ fontSize: '2.5rem', color: 'var(--secondary)', fontWeight: 700, margin: '1rem 0' }}>&#8377; {balance}</p>
						</div>
						<div className="send-money-container">
							<form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={sendMoney}>
								<h4 style={{ color: 'var(--primary)', fontWeight: 700 }}>Send Money</h4>
								<div className="form-floating">
									<input type="text" className="input" id="receiverNameInput" name="sendingAcId" onChange={(e)=> setSendingAcId(e.target.value)} value={sendingAcId || ''} placeholder="Receiver's a/c id" />
								</div>
								<div className="form-floating">
									<input type="text" className="input" id="sendingIFSC" name="sendingAcId" onChange={(e)=> setSendingIFSC(e.target.value)} value={sendingIFSC || ''} placeholder="IFSC" />
								</div>
								<div className="form-floating">
									<input type="number" className="input" id="sendAmount" name="sendingAmount" onChange={(e)=> setSendingAmount(e.target.value)} value={sendingAmount || ''} placeholder="Amount" />
								</div>
								{sendingAmount > 0 && sendingAmount < 200000 ? (
									<select className="input" aria-label=".form-select-sm example" onChange={(e)=> setSendingMethod(e.target.value)}>
										<option value="">Choose payment method</option>
										<option value="IMPS">IMPS</option>
										<option value="NEFT">NEFT</option>
									</select>
								) : (
									<>
										{sendingAmount > 0 && sendingAmount > 200000 ? (
											<select className="input" aria-label=".form-select-sm example" onChange={(e)=> setSendingMethod(e.target.value)}>
												<option value="">Choose payment method</option>
												<option value="RTGS">RTGS</option>
												<option value="NEFT">NEFT</option>
											</select>
										) : ""}
									</>
								)}
								<div className="form-floating">
									<input type="text" className="input" id="sendremarks" name="sendingremarks" onChange={(e)=> setSendingRemarks(e.target.value)} value={sendingRemarks || ''} placeholder="Remarks" />
								</div>
								<button type="submit" className="btn" style={{ background: 'var(--secondary)', color: 'var(--primary)', fontWeight: 700, borderRadius: '8px', marginTop: '1rem' }}>Send</button>
							</form>
						</div>
					</div>
					<div className="home-container2 card" style={{ flex: 2, minWidth: '350px', padding: '2rem', background: 'var(--surface)', borderRadius: '16px', boxShadow: 'var(--shadow)', borderLeft: '8px solid var(--secondary)' }}>
						<div className="user-transactions-container">
							<h4 style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '1.5rem' }}>Recent Transactions</h4>
							<div className="user-transactions-body">
								<div className='user-transactions' style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
									{transactions && transactions.filter(transaction => transaction.senderId === userid || transaction.receiverId === userid).map((transaction) => {
										return (
											<div className={`user-transaction card ${transaction.senderId === userid ? 'money-sent' : 'money-received'}`} key={transaction._id} style={{ background: transaction.senderId === userid ? 'var(--accent)' : 'var(--surface)', borderLeft: transaction.senderId === userid ? '6px solid var(--primary)' : '6px solid var(--secondary)', borderRadius: '12px', boxShadow: 'var(--shadow)', padding: '1rem' }}>
												<span>
													<p><b>Amount: </b>&#8377; {transaction.amount}</p>
													{transaction.deposit ? <p><b>Deposit name:</b> {transaction.deposit}</p> : transaction.loan ? <p><b>Loan name:</b> {transaction.loan}</p> : null}
													{transaction.senderId === userid ? <p><b>Receiver a/c id:</b> {transaction.receiverId}</p> : <p><b>Sender a/c id:</b> {transaction.senderId}</p>}
												</span>
												<span>
													{transaction.senderId === userid ? <p><b>Receiver:</b> {transaction.receiverName}</p> : <p><b>Sender:</b> {transaction.senderName}</p>}
													<p><b>Payment Method:</b> {transaction.paymentMethod}</p>
													<p><b>IFSC:</b> {transaction.receiverIFSC}</p>
												</span>
												<span>
													<p><b>Time:</b> {transaction.time ? transaction.time.slice(4,24) : 'N/A'}</p>
													<p><b>Remarks:</b> {transaction.remarks}</p>
												</span>
											</div>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;