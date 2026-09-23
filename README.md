# Watergate: Full-Stack Mock Banking App

## Purpose

Watergate is a full-stack banking demo built with React, Express, and MySQL. Users can create an account, sign in by username, and manage checking and savings balances through deposits, withdrawals, and transfers between accounts.

Watergate is a fictional bank; I made up the name. The site's design is based on the Chase Bank website as it looked when I built the app. The app does not handle real money or real financial data.

**Live site:** https://watergate-repo.vercel.app

## Major Functions

- **Landing page:** a bank-style home page with promo carousels, featured cards, and product sections (checking, credit cards, auto, business)
- **Account creation:** the user picks an account type and registers with a first name, last name, and username
- **Sign-in:** looks the username up in the database before routing to that user's dashboard
- **Account dashboard:** shows live checking and savings balances
- **Transactions:**
  - Deposit to or withdraw from checking or savings
  - Transfer between checking and savings
  - Validation for empty fields, same-account transfers, non-numeric or negative amounts, and insufficient funds
- **Client-side routing** with React Router (`/`, `/create-account`, `/account/:username`)

### API Endpoints

| Method | Route                       | Description |
|--------|-----------------------------|-------------|
| POST   | `/create-account`           | Create a new account |
| GET    | `/api/check-user/:username` | Check whether a username exists (used for sign-in) |
| GET    | `/api/balance/:username`    | Get checking and savings balances |
| POST   | `/api/update_balances`      | Update checking and savings balances |

### Architecture

```
React (Vercel)  ──HTTPS──>  Express API (Railway)  ──>  MySQL (Railway)
```

The API uses a MySQL connection pool with keep-alive turned on so Railway doesn't drop idle connections. CORS allows requests only from the local dev server and the Vercel deployments.

## Dependencies

### Frontend (`/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| react / react-dom | ^19.1.0 | UI library |
| react-router-dom | ^7.13.1 | Client-side routing |
| axios | ^1.11.0 | HTTP requests to the API |
| swiper | ^11.2.10 | Landing page carousels |
| react-responsive-carousel | ^3.2.23 | Carousel component |
| tailwindcss, @tailwindcss/vite, @tailwindcss/postcss | ^4.1.11 | Styling |
| vite, @vitejs/plugin-react | ^7.0.4, ^4.6.0 | Dev server and build tool (dev) |
| eslint + plugins | ^9.30.1 | Linting (dev) |
| postcss, autoprefixer | ^8.5.6, ^10.4.21 | CSS processing (dev) |

### Backend (`/watergate-server/package.json`)

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^4.18.2 | Web server and routing |
| mysql2 | ^3.18.0 | MySQL driver and connection pool |
| cors | ^2.8.6 | Cross-origin request handling |
| body-parser | ^1.20.2 | JSON request body parsing |
| dotenv | ^16.0.0 | Loads environment variables from `.env` |

### Services and tools
- Node.js 18 or newer, and npm
- MySQL 8 (hosted on Railway)
- Vercel (frontend hosting)
- Railway (API and database hosting)

## Build Instructions (Local)

### 1. Clone the repo
```bash
git clone https://github.com/CameronIFrazier/watergate-repo.git
cd watergate-repo
```

### 2. Set up the database
Create a MySQL database and run:
```sql
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(50) UNIQUE NOT NULL,
  account_type VARCHAR(30),
  checking_balance DECIMAL(12,2) DEFAULT 0,
  savings_balance DECIMAL(12,2) DEFAULT 0
);
```

### 3. Run the backend
```bash
cd watergate-server
npm install
```
Create a `.env` file in `watergate-server/` with your database credentials. Don't commit this file.
```
MYSQLHOST=
MYSQLPORT=
MYSQLUSER=
MYSQLPASSWORD=
MYSQLDATABASE=
```
Then start the server:
```bash
npm start        # http://localhost:8080
```

### 4. Run the frontend
In a new terminal, from the project root:
```bash
npm install
npm run dev      # http://localhost:5173
```

> The frontend calls the deployed Railway API by default. To use your local backend instead, replace `https://watergate-repo-production.up.railway.app` with `http://localhost:8080` in `src/App.jsx`, `src/AccountCreatorScreen.jsx`, and `src/AccountScreen.jsx`.

### 5. Production build
```bash
npm run build    # outputs to /dist
npm run preview  # preview the production build locally
```

## Deployment

### Backend and database (Railway)
1. Create a new Railway project and add a **MySQL** database service.
2. Run the `CREATE TABLE` script above in the Railway MySQL console.
3. Add a new service from this GitHub repo and set its **Root Directory** to `watergate-server`.
4. Under **Variables**, set `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`, `MYSQLPASSWORD`, and `MYSQLDATABASE`. You can use references to the MySQL service's variables.
5. Railway runs `npm start` automatically. Under **Networking**, generate a public domain that points to port **8080**.

### Frontend (Vercel)
1. Import the GitHub repo into Vercel.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. Deploy. The included `vercel.json` rewrites all routes to `/`, so React Router paths like `/account/:username` work on refresh.
4. Add the Vercel URL to `allowedOrigins` in `watergate-server/server.js` and redeploy the backend so CORS allows it.

Both Vercel and Railway redeploy automatically when you push to `main`.
