# Polling Application

## Overview

This Polling Application allows users to create, vote on, and view polls. Users can also manage their profiles, including updating their usernames and profile pictures. Real-time notifications are provided when a user's poll receives a new vote or comment.

## Features

- **User Authentication**: Sign up, log in, and manage sessions.
- **Poll Creation and Voting**: Create polls with multiple options and vote on them.
- **User Profile Management**: View and edit username and profile picture.
- **Real-time Notifications**: Receive notifications for new votes and comments on your polls.

## Technology Stack

- **Frontend**: React, React Router, Styled Components
- **Backend**: Node.js, Express, MongoDB
- **Cloud Storage**: Cloudinary for profile picture uploads

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB
- Cloudinary Account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/polling-app.git
cd polling-app
2. Install Dependencies
bash
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

plaintext
MONGODB_URI=mongodb://localhost:27017/polling-app
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
4. Run the Server
bash
npm start
The server will start on http://localhost:5000.

5. Run the Client
In a separate terminal, navigate to the client directory and start the React application:

bash
cd client
npm install
npm start
The client will start on http://localhost:3000.

API Endpoints
User Authentication
POST /api/auth/signup: Sign up a new user
POST /api/auth/login: Log in an existing user
Polls
GET /api/polls: Get all polls
POST /api/polls: Create a new poll
GET /api/polls/
: Get a single poll by ID
POST /api/polls/
/vote: Vote on a poll
Profile
GET /api/profile: Get the logged-in user's profile
POST /api/upload-profile-picture: Upload a new profile picture
PUT /api/update-username: Update the username
Directory Structure
plaintext
polling-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── package.json
├── .env
└── README.md
Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bugs.

License
This project is licensed under the MIT License. See the LICENSE file for details.  https://github.com/RohitSahuvlog/velocity-ai-assignment/blob/main/client/src/asset/image%20(4).png
