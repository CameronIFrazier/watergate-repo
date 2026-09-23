Watergate : Full Stack Mock Banking App

A full stack banking demo built with React, Express, and MySQL. Users can create an account, sign in by username, and manage checking and savings balances through deposits, withdrawals, and transfers between accounts.

Watergate is a fictional bank whose name I made up, and the website is based off of a version of the chase bank website as it looked at the time of the app creation. The app does not handle real money or real financial data.

Live demo: https://watergate-repo.vercel.app

Features
Bank-style landing page with promo carousels, featured cards, and product sections (checking, credit cards, auto, business)
Account creation: pick an account type and register with a first name, last name, and username
Username sign-in that looks the user up in the database before routing to their dashboard
Account dashboard that shows live checking and savings balances
Transactions:
Deposit to or withdraw from checking or savings
Transfer between checking and savings
Validation for empty fields, same-account transfers, non-numeric or negative amounts, and insufficient funds
Client-side routing with React Router (/, /create-account, /account/:username)


Tech Stack
Layer	Tech
Frontend	React 19, Vite, Tailwind CSS v4, React Router, Axios, Swiper
Backend	Node.js, Express, mysql2 (connection pool)
Database	MySQL (hosted on Railway)
Hosting	Vercel (frontend), Railway (API + DB)
Architecture
React (Vercel)  ──HTTPS──>  Express API (Railway)  ──>  MySQL (Railway)

The API uses a MySQL connection pool with keep-alive enabled so Railway doesn't drop idle connections. CORS is restricted to the local dev server and the Vercel deployments.

API Endpoints
Method	Route	Description
POST	/create-account	Create a new account
GET	/api/check-user/:username	Check whether a username exists (used for sign-in)
GET	/api/balance/:username	Get checking and savings balances
POST	/api/update_balances	Update checking and savings balances
