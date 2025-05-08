# 🧑‍💼 JOB Portal - MERN Stack Project

A full-featured **Job Portal Application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. This platform allows employers to post jobs and candidates to search and apply for them — a complete recruitment and job-seeking solution.

---

## 📌 Features

### 👤 Candidate Panel
- User registration and secure login
- Search and filter job listings
- View detailed job descriptions
- Apply for jobs directly
- Track application status

### 🧑‍💼 Employer Panel
- Employer registration and login
- Post, update, and delete job listings
- View applications from candidates
- Manage job posts and applicant pipeline

### 🛡️ Admin Panel
- Manage all users (candidates & employers)
- Monitor all job postings and applications
- Access system-wide controls and analytics
- Moderate content and user activities

---

## 🛠️ Tech Stack

| Layer       | Technology                |
|-------------|----------------------------|
| Frontend    | React.js, Tailwind CSS     |
| Backend     | Node.js, Express.js        |
| Database    | MongoDB with Mongoose ODM  |
| Auth        | JWT for secure authentication |
| API Testing | Postman                    |
| Deployment  | Render (Backend), (Frontend optional) |

---

## 📁 Folder Structure

job-portal/
│
├── client/ # React Frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js


├── server/ # Express Backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── server.js
│
└── README.md

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/amShubhama/JOB-PORTAL-WEBSITE.git
cd JOB-PORTAL-WEBSITE
2. Setup Server
cd server
npm install
node server.js
3. Setup Client
cd client
npm install
npm run dev
🔐 Environment Variables
Create a .env file in the server directory with the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
🚀 Deployment
Backend deployed on Render

You can optionally deploy the frontend on Vercel or Netlify

MongoDB hosted on MongoDB Atlas

🧑‍💻 Contributing
Fork the repository

Create your feature branch: git checkout -b feature/my-feature

Commit your changes: git commit -m "Add my feature"

Push to the branch: git push origin feature/my-feature

Open a pull request

🙌 Credits
Developed by Shubham
Guided by PW Skills and GreatStack
Contact: Shubham31sk54@gmail.com
