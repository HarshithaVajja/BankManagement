import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/loans.css';
import axios from 'axios';

const Loans = () => {
  const username = localStorage.getItem('username');
  const userid = localStorage.getItem('userId');

  const [newLoanType, setNewLoanType] = useState('');
  const [newNomineeName, setNewNomineeName] = useState('');
  const [newNomineeAge, setNewNomineeAge] = useState(0);
  const [newLoanAmount, setNewLoanAmount] = useState(0);
  const [newLoanDuration, setNewLoanDuration] = useState(0);

  const [paymentLoanId, setPaymentLoanId] = useState();
  const [paymentLoanAmount, setPaymentLoanAmount] = useState(0);

  const [loans, setLoans] = useState([]);

  useEffect(() => {
    fetchLoansData();
  }, []);

  const fetchLoansData = async () => {
    try {
      if (userid) {
        const response = await axios.get('http://localhost:6001/fetch-loans');
        setLoans(response.data.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const makePayment = (loanId) => {
    alert(`Payment for loan ${loanId} submitted.`);
    setPaymentLoanAmount(0);
    setPaymentLoanId();
  };

  const createNewLoan = async () => {
    const newLoanDetails = {
      loanType: newLoanType,
      customerId: userid,
      customerName: username,
      nomineeName: newNomineeName,
      nomineeAge: newNomineeAge,
      duration: newLoanDuration,
      loanAmount: newLoanAmount,
      createdDate: new Date(),
    };

    try {
      await axios.post('http://localhost:6001/new-loan', newLoanDetails);
      alert('Loan application submitted.');
      setNewLoanType('');
      setNewNomineeName('');
      setNewNomineeAge(0);
      setNewLoanAmount(0);
      setNewLoanDuration(0);
      fetchLoansData();
    } catch (err) {
      alert('Error submitting loan application.');
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="user-loans-page">
        {/* Left Side - Existing Loans */}
        <div className="user-loans-container1">
          <div className="user-loans">
            <h3>My Loans</h3>
            <div className="user-loans-body">
              {loans && loans.filter((loan) => loan.customerId === userid).length === 0 ? (
                <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.2rem' }}>
                  No loans found for your account.
                </p>
              ) : (
                <>
                  {loans
                    .filter((loan) => loan.customerId === userid)
                    .map((loan) => (
                      <div className="user-loan" key={loan._id}>
                        <span>
                          <p><b>Loan type:</b></p>
                          <p>{loan.loanType}</p>
                        </span>
                        <span>
                          <p><b>Nominee name:</b></p>
                          <p>{loan.nomineeName}</p>
                        </span>
                        <span>
                          <p><b>Nominee age:</b></p>
                          <p>{loan.nomineeAge}</p>
                        </span>
                        <span>
                          <p><b>Balance:</b></p>
                          <p>{loan.balance}</p>
                        </span>
                        <span>
                          <p><b>Duration:</b></p>
                          <p>{loan.duration} months</p>
                        </span>
                        <span>
                          <p><b>Status:</b></p>
                          <p>{loan.loanStatus}</p>
                        </span>
                        {loan.loanStatus === 'approved' && (
                          <span>
                            <p><b>End Date:</b></p>
                            <p>{loan.endDate}</p>
                          </span>
                        )}

                        {loan.loanStatus === 'approved' && (
                          <div>
                            {paymentLoanId === loan._id ? (
                              <div className="input-group mb-3 paymentInputDiv">
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Re-pay loan amount"
                                  onChange={(e) => setPaymentLoanAmount(e.target.value)}
                                  value={paymentLoanAmount}
                                />
                                <button
                                  className="btn btn-primary"
                                  onClick={() => makePayment(loan._id)}
                                >
                                  Make payment
                                </button>
                              </div>
                            ) : (
                              <button
                                className="btn btn-primary"
                                onClick={() => setPaymentLoanId(loan._id)}
                              >
                                Make payment
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - Loan Form */}
        <div className="user-loans-container2">
          <div className="new-user-loans-container">
            <h3>Apply for New Loan</h3>
            <select
              className="form-select"
              onChange={(e) => setNewLoanType(e.target.value)}
              value={newLoanType}
            >
              <option value="">Choose loan type</option>
              <option value="home-loan">Home loan</option>
              <option value="vehicle-loan">Vehicle loan</option>
              <option value="personal-loan">Personal loan</option>
            </select>

            <div className="input-row">
              <div className="form-floating input-row11">
                <input
                  type="text"
                  className="form-control"
                  id="nomineeNameInput"
                  placeholder="Nominee name"
                  onChange={(e) => setNewNomineeName(e.target.value)}
                  value={newNomineeName}
                />
                <label htmlFor="nomineeNameInput">Nominee name</label>
              </div>
              <div className="form-floating input-row12">
                <input
                  type="number"
                  className="form-control"
                  id="nomineeAgeInput"
                  placeholder="Age"
                  onChange={(e) => setNewNomineeAge(e.target.value)}
                  value={newNomineeAge}
                />
                <label htmlFor="nomineeAgeInput">Age</label>
              </div>
            </div>

            <div className="input-row">
              <div className="form-floating input-row21">
                <input
                  type="number"
                  className="form-control"
                  id="user-loanAmountInput"
                  placeholder="Loan amount"
                  onChange={(e) => setNewLoanAmount(e.target.value)}
                  value={newLoanAmount}
                />
                <label htmlFor="user-loanAmountInput">Loan amount</label>
              </div>
              <div className="form-floating input-row22">
                <input
                  type="number"
                  className="form-control"
                  id="user-loanDurationInput"
                  placeholder="Duration"
                  onChange={(e) => setNewLoanDuration(e.target.value)}
                  value={newLoanDuration}
                />
                <label htmlFor="user-loanDurationInput">Duration (in months)</label>
              </div>
            </div>

            <p>
              * I hereby agree to all the terms & conditions to take this loan. I agree
              to pay interest with the dynamic interests depending upon the market
              conditions. I agree to repay the loan before the deadline.
            </p>

            <button className="btn btn-primary" onClick={createNewLoan}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loans;