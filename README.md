# Bank Management System

A full-stack banking web app with separate customer and admin dashboards. Customers can send money, make deposits and take loans. Admins can see and manage every user, deposit, loan and transaction in the system.

## Features

**Customers**
- Register and log in (passwords hashed with bcrypt)
- View account details, deposits, loans and personal transaction history
- Send money to other accounts
- Create and track deposits
- Request and repay loans

**Admins**
- View all users, deposits, loans and transactions
- Approve or decline loan requests

**Route protection**
- Logged-out users can't open app pages, and logged-in users skip the landing page (`AuthProtector` / `LoginProtector`)

## Tech Stack

| Layer | Tools |
|---|---|
| Frontend | React 18, React Router v6, Axios |
| Backend | Node.js, Express (ES modules), routes/controllers structure |
| Database | MongoDB with Mongoose |
| Auth | bcrypt password hashing, custom route-protector components |
| Other | dotenv, CORS, body-parser |

## Setup

```bash
git clone https://github.com/HarshithaVajja/BankManagement.git
cd BankManagement

# Backend
cd server
npm install
npm start

# Frontend (in a new terminal)
cd client
npm install
npm start
```

Create a `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
