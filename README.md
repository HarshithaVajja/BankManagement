
## `BankManagement`

```markdown
# Bank Management System

A full-stack bank management application supporting [account creation, 
deposits/withdrawals, transaction history — adjust to what it actually does] 
built with the MERN-adjacent stack and MongoDB.

## Overview
- A full-stack bank management web app with separate customer and admin experiences, backed by MongoDB. Users can register, log in, and manage deposits, loans, and money transfers from their own dashboard. Admins get dedicated views to oversee all users, deposits, loans, and transactions across the system. Route protection (AuthProtector/LoginProtector) gates pages so logged-out users can't reach the app and logged-in users skip the landing page. It's a solid MERN-style CRUD showcase — it just needs the README to catch up to what's actually built.

## Tech Stack
- Frontend: React 18 + React Router v6, Axios for API calls
- Backend: Node.js + Express (ESM modules), organized into routes/controllers
- Database: MongoDB via Mongoose
- Auth: bcrypt for password hashing, custom route-protector components for session gating
- Other: dotenv for config, CORS enabled, body-parser for payloads

## Features
- User registration and login with hashed passwords
- Customer dashboard: view account/user details, deposits, loans, and personal transaction history
- Send-money transfers between accounts
- Deposit creation and tracking
- Loan lifecycle: request, approve, decline, and repay loans
- Admin panel: view all users, all deposits, all loans, and all transactions system-wide

## Setup & Installation
\`\`\`bash
git clone https://github.com/HarshithaVajja/BankManagement.git
cd BankManagement

# Backend
cd server
npm install
npm start

# Frontend (new terminal)
cd client
npm install
npm start
\`\`\`

## Environment Variables
Create a `.env` file in `/server` with:
\`\`\`
MONGO_URI=your_mongodb_connection_string
PORT=5000
\`\`\`

