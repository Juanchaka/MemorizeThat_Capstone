            # MemorizeThat

MemorizeThat is a full-stack web application designed to challenge and improve users' memory through an engaging game while tracking their progress over time.

## Description

MemorizeThat combines fun gameplay with user progress tracking. Users can create accounts, play a memory game, view their high scores, and manage their profiles. The application is built using the MERN stack (MongoDB, Express.js, React, and Node.js), providing a robust and scalable architecture.

## Features

- User Authentication: Secure login and registration system
- Memory Game: Engaging gameplay to challenge and improve users' memory
- High Scores: Users can view their personal best performances
- User Profiles: Users can view and edit their profile information
- Responsive Design: The application is fully responsive and works on various devices

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose for data storage
- JSON Web Tokens (JWT) for authentication

## Project Structure

The project is divided into two main directories:

- `frontend/`: Contains the React application
- `backend/`: Contains the Express.js server and API

### Key Components

1. User Authentication (Login/Register)
2. Game Component
3. Profile Management (CRUD)
4. High Score Tracking

## API Endpoints

The application includes several API endpoints for user management and game data:

javascript:backend/server/routes/apiRoutes.js

## Setup and Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Set up environment variables (create a `.env` file in the backend and frontend directories) and make sure to include:
for backend:
MONGODB_URI: for connection to MongoDB and an empty collection
PORT: where the backend will be hosted
JWT_SECRET: Used for authentication
PROD_FRONTEND_URL:Reactdefault hosting url

for frontend:
VITE_API_URL:Reactdefault hosting url

4. Start the backend server:
   ```
   cd backend && npm run dev
   ```
5. Start the frontend development server:
   ```
   cd frontend && npm run dev
   ```

## Scripts

Backend:
json:backend/server/package.json

## Future Enhancements

- Additional memory games each with their own difficulty levels
- Social features like friend leaderboards
- More detailed progress analytics
- Background music while playing