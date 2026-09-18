# Zomato Partner Platform - NichePay Integration Demo

This is a complete full-stack application built with React, Tailwind, Node.js, Express, and MongoDB.

## Requirements
- Node.js (v16+)
- MongoDB (Running locally or update `backend/.env` with your MongoDB Atlas URI)

## Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run seed` to seed the database with the 5 demo users and their deliveries.
4. Run `npm start` (or `npm run dev` for nodemon) to start the Express server on port 5000.

## Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server.
4. Open your browser to `http://localhost:5173`.

## Demo Accounts
Use any of the following accounts to log in (password is `password123` for all):
- tharun@demo.zomato
- koushik@demo.zomato
- chaitanya@demo.zomato
- dwarakesh@demo.zomato
- balu@demo.zomato

## NichePay Integration
The NichePay adapter is located in `backend/services/nichepayService.js` and the connection endpoint is available in `backend/server.js`. Partners can connect to NichePay via their Profile page in the frontend dashboard.
