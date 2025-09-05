import express from 'express';
import { register, login } from '../controllers/authController.js';
import { getUserDetails, fetchUsers } from '../controllers/userController.js';
import { sendMoney, fetchTransactions } from '../controllers/transactionController.js';
import { fetchDeposits, newDeposit } from '../controllers/depositController.js';
import { fetchLoans, newLoan, approveLoan, declineLoan, repayLoan } from '../controllers/loanController.js';

const router = express.Router();

// Auth
router.post('/register', register);
router.post('/login', login);

// User
router.get('/user-details/:id', getUserDetails);
router.get('/fetch-users', fetchUsers);

// Transactions
router.post('/send-money', sendMoney);
router.get('/transactions', fetchTransactions);

// Deposits
router.get('/fetch-deposits', fetchDeposits);
router.post('/new-deposit', newDeposit);

// Loans
router.get('/fetch-loans', fetchLoans);
router.post('/new-loan', newLoan);
router.put('/approve-loan', approveLoan);
router.put('/decline-loan', declineLoan);
router.post('/repay-loan', repayLoan);

export default router;
