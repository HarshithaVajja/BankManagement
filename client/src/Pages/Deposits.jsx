import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/deposits.css';
import axios from 'axios';

const Deposits = () => {
  const username = localStorage.getItem('username');
  const userid = localStorage.getItem('userId');

  const [newDepositName, setNewDepositName] = useState('');
  const [newNomineeName, setNewNomineeName] = useState('');
  const [newNomineeAge, setNewNomineeAge] = useState(0);
  const [newDepositAmount, setNewDepositAmount] = useState(0);
  const [newDepositDuration, setNewDepositDuration] = useState(0);

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    fetchDepositsData();
  }, []);

  const fetchDepositsData = async () => {
    try {
      if (userid) {
        const response = await axios.get('http://localhost:6001/fetch-deposits');
        setDeposits(response.data.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createNewDeposit = async () => {
    const newDepositDetails = {
      depositName: newDepositName,
      customerId: userid,
      customerName: username,
      nomineeName: newNomineeName,
      nomineeAge: newNomineeAge,
      duration: newDepositDuration,
      amount: newDepositAmount,
      createdDate: new Date(),
    };

    try {
      await axios.post('http://localhost:6001/new-deposit', newDepositDetails);
      alert('New deposit created');
      setNewDepositName('');
      setNewNomineeName('');
      setNewNomineeAge(0);
      setNewDepositAmount(0);
      setNewDepositDuration(0);
      fetchDepositsData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="user-deposits-page">
        {/* Left Side - Existing Deposits */}
        <div className="user-deposits-container1">
          <div className="user-deposits">
            <h3>Fixed Deposits</h3>
            <div className="user-deposits-body">
              {deposits
                .filter((deposit) => deposit.customerId === userid)
                .map((deposit) => (
                  <div className="user-deposit" key={deposit._id}>
                    <span>
                      <p><b>Deposit name:</b></p>
                      <p>{deposit.depositName}</p>
                    </span>
                    <span>
                      <p><b>Nominee name:</b></p>
                      <p>{deposit.nomineeName}</p>
                    </span>
                    <span>
                      <p><b>Nominee age:</b></p>
                      <p>{deposit.nomineeAge}</p>
                    </span>
                    <span>
                      <p><b>Amount:</b></p>
                      <p>{deposit.amount}</p>
                    </span>
                    <span>
                      <p><b>Duration:</b></p>
                      <p>{deposit.duration} months</p>
                    </span>
                    <span>
                      <p><b>Maturity Date:</b></p>
                      <p>{deposit.matureDate}</p>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right Side - New Deposit Form */}
        <div className="user-deposits-container2">
          <div className="new-user-deposits-container">
            <h3>New Fixed Deposit</h3>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="user-depositNameInput"
                placeholder="Deposit name"
                onChange={(e) => setNewDepositName(e.target.value)}
                value={newDepositName}
              />
              <label htmlFor="user-depositNameInput">Deposit name</label>
            </div>

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
                  id="user-depositAmountInput"
                  placeholder="Amount"
                  onChange={(e) => setNewDepositAmount(e.target.value)}
                  value={newDepositAmount}
                />
                <label htmlFor="user-depositAmountInput">Deposit amount</label>
              </div>
              <div className="form-floating input-row22">
                <input
                  type="number"
                  className="form-control"
                  id="user-depositDurationInput"
                  placeholder="Duration"
                  onChange={(e) => setNewDepositDuration(e.target.value)}
                  value={newDepositDuration}
                />
                <label htmlFor="user-depositDurationInput">
                  Duration (in months)
                </label>
              </div>
            </div>

            <p>
              * I hereby agree to all the terms & conditions to make this deposit.
              I agree to gain interest with the dynamic interests depending upon
              the market conditions. I agree that at any case I cannot break the
              deposit before the maturity date.
            </p>

            <button className="btn btn-primary" onClick={createNewDeposit}>
              Deposit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deposits;