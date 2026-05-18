# 🪐 AI-Driven Employee Performance Analytics System

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple)
![Deployment](https://img.shields.io/badge/Deployment-Render-brightgreen)
![Security](https://img.shields.io/badge/Security-JWT%20%2B%20Bcrypt-red)

An AI-driven employee performance analytics system that helps organizations manage employee records, analyze performance metrics, and generate AI-powered growth insights.  
Built with a decoupled MERN architecture, secure authentication, and AI integration for smarter workforce decision-making.

> 💡 Designed to simplify employee performance tracking by combining secure data management with AI-powered analytics.

---

## 🚀 Live Demo

👉 https://employee-performance-system-portal.onrender.com/

---


## 📸 Screenshots

### Dashboard / Employee Analytics
<img src="https://github.com/user-attachments/assets/7da6d9a6-450c-49fd-859c-d2600142408b" width="70%" />

### AI Chatbot / Growth Insights
<img src="https://github.com/user-attachments/assets/37a844c9-785a-435d-b228-3653822b9553" width="40%" />

---

## ✨ Key Features

- 🔐 **Secure Authentication** — Login and registration using JWT and Bcrypt password hashing
- 👥 **Employee Management** — Add, view, update, and manage employee records
- 📊 **Performance Analytics** — Track employee performance scores and work-related metrics
- 🧠 **AI-Powered Insights** — Generate contextual growth plans and improvement suggestions
- 🤖 **AI Chatbot Assistant** — Ask performance-related questions through an integrated AI assistant
- ⭐ **Dynamic Candidate Ranking** — Rank employees/candidates based on performance and matching criteria
- 🛡️ **Protected Routes** — Restrict dashboard access to authenticated users
- ⚡ **REST API Backend** — Fast and structured Express.js API architecture
- 📱 **Responsive UI** — Optimized for desktop and mobile screens
- 🌐 **Deployed Application** — Hosted online using Render

---

## 🛠️ Tech Stack

### Frontend

- React.js (Vite)
- Tailwind CSS v4
- Axios
- HTML5 / CSS3

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Security

- JSON Web Tokens (JWT)
- Bcrypt.js Password Hashing

### AI Integration

- OpenRouter API
- AI Chatbot / LLM-based analytics

### Deployment

- Render

---

## 📁 Project Structure

```text
employee-performance-system/
├── backend/
│   ├── config/             # Database configuration
│   ├── controllers/        # Request and response logic
│   ├── middleware/         # JWT authentication middleware
│   ├── models/             # Mongoose models (User, Employee)
│   ├── routes/             # API routes
│   ├── .env                # Environment variables
│   ├── package.json
│   └── server.js           # Backend entry point
│
├── frontend/
│   ├── public/             # Static files
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── App.css
│   │   ├── App.jsx         # Main app component
│   │   ├── index.css       # Tailwind CSS
│   │   └── main.jsx        # React entry point
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-mishra-007/employee-performance-system.git
cd employee-performance-system
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file in the **backend** folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
```

---

### 4. Run the Application

#### Start Backend

```bash
cd backend
npm start
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔌 API Endpoints

### Auth Routes

* POST /api/auth/register
* POST /api/auth/login

### Employee Routes

* GET /api/employees
* POST /api/employees
* PUT /api/employees/:id
* DELETE /api/employees/:id

### AI Routes

* POST /api/ai/analyze
* POST /api/chat

---

## 🌐 Deployment

* Frontend deployed on Render
* Backend connected through Render
* Database hosted on MongoDB Atlas
* AI features powered by OpenRouter API

---

## 🎯 Purpose of the Project

This project was built to:

* Practice full-stack MERN development
* Implement secure authentication using JWT and Bcrypt
* Build an employee performance tracking system
* Integrate AI-powered analytics into a real-world application
* Learn backend API handling, protected routes, and deployment
* Create a portfolio-ready AI-based project

---

## 🚀 Future Improvements

* 📄 Employee report export as PDF
* 📊 Advanced analytics dashboard
* ⭐ AI-based performance scoring
* 🔍 Employee search and filtering
* 🔐 Role-based admin/user access
* 📧 Email notifications and reminders
* 📈 Graphs and charts for performance trends

---

## 👨‍💻 Author

**Aditya Mishra**  
GitHub: https://github.com/aditya-mishra-007

---
