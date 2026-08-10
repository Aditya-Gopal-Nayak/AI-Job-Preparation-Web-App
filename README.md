# 🤖 AI Job Preparation Web App

An AI-powered full-stack web application designed to help job seekers prepare for placements and interviews through **AI-based resume analysis, personalized feedback, and interview preparation**.

The application uses **React** for the frontend, **Node.js** for the backend, **JWT** for secure authentication, and **Google Gemini AI** for intelligent resume analysis and personalized career guidance.

---

## 🚀 Features

### 📄 AI Resume Analysis

* Upload and process resumes.
* Analyze resume content using Gemini AI.
* Generate personalized feedback.
* Identify areas for improvement.
* Provide suggestions to make resumes more effective.

### 🤖 Gemini AI Integration

* Integrated Google Gemini AI for intelligent resume processing.
* Generates personalized recommendations based on resume content.
* Automates resume analysis and feedback generation.
* Provides AI-powered assistance for interview preparation.

### 🎯 Interview Preparation

* Helps users prepare for technical interviews.
* Provides AI-generated interview questions.
* Generates personalized preparation guidance.
* Supports interview-focused learning based on user requirements.

### 🔐 Secure Authentication

* Implemented JWT-based authentication.
* Secure user login and registration.
* Protected backend API routes.
* Token-based authorization for authenticated users.

### 💻 Responsive User Interface

* Built using React.
* Styled using TailwindCSS.
* Responsive design for different screen sizes.
* Clean and intuitive user experience.
* Smooth communication between frontend and backend.

---

## 🛠️ Tech Stack

### Frontend

* React.js
* TailwindCSS
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication

### AI

* Google Gemini AI

### Database

* MongoDB

### Tools

* Git
* GitHub
* VS Code
* npm

---

## 🏗️ System Architecture

```text
                   ┌───────────────────┐
                   │       User        │
                   └─────────┬─────────┘
                             │
                             ▼
                   ┌───────────────────┐
                   │   React Frontend  │
                   │   + TailwindCSS   │
                   └─────────┬─────────┘
                             │
                       REST API
                             │
                             ▼
                   ┌───────────────────┐
                   │  Node.js Backend  │
                   │    Express.js     │
                   └───────┬─────┬─────┘
                           │     │
                 ┌─────────┘     └─────────┐
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │     MongoDB     │       │  Gemini AI API  │
        │     Database    │       │ Resume Analysis │
        └─────────────────┘       └─────────────────┘
                           │
                           ▼
                  Personalized Feedback
```

---

## 📁 Project Structure

```text
AI-Job-Preparation-Web-App/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── assets/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> Update the folder structure above if your actual project structure is different.

---

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/AI-Job-Preparation-Web-App.git
```

```bash
cd AI-Job-Preparation-Web-App
```

---

### 2. Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### 3. Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will usually run on:

```text
http://localhost:5173
```

---

## 🔐 Environment Variables

The backend requires the following environment variables:

| Variable         | Description                            |
| ---------------- | -------------------------------------- |
| `PORT`           | Backend server port                    |
| `MONGO_URI`      | MongoDB connection string              |
| `JWT_SECRET`     | Secret key used for JWT authentication |
| `GEMINI_API_KEY` | Google Gemini AI API key               |

**Never upload your `.env` file or API keys to GitHub.**

Add the following to `.gitignore`:

```text
.env
node_modules/
```

---

## 🔄 Application Workflow

### User Authentication

```text
User
  ↓
Register / Login
  ↓
Node.js Backend
  ↓
JWT Authentication
  ↓
Authenticated User
```

### Resume Analysis

```text
User uploads resume
        ↓
React Frontend
        ↓
Node.js / Express API
        ↓
Resume Processing
        ↓
Gemini AI
        ↓
Resume Analysis
        ↓
Personalized Feedback
        ↓
React Frontend
        ↓
User
```

---

## 🤖 AI Resume Analysis

Gemini AI is used to process resume information and provide meaningful feedback.

The AI-powered workflow includes:

1. Resume submission.
2. Resume content processing.
3. Sending relevant content to Gemini AI.
4. AI-based analysis.
5. Generation of personalized feedback.
6. Displaying recommendations to the user.

---

## 🔒 Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

### Authentication Flow

```text
Login
  ↓
Backend validates credentials
  ↓
JWT token generated
  ↓
Token sent to client
  ↓
Client stores authentication state
  ↓
Token included in protected requests
  ↓
Backend verifies JWT
  ↓
Access granted
```

Protected routes ensure that only authenticated users can access user-specific functionality.

---

## 🌐 API Integration

The React frontend communicates with the Node.js backend through REST APIs.

Example API structure:

```text
/api/auth
/api/resume
/api/interview
```

The exact routes may vary depending on the implementation.

---

## 📱 Responsive Design

The application interface is built using **React and TailwindCSS**.

The UI focuses on:

* Responsive layouts
* Clean navigation
* User-friendly forms
* Resume upload interface
* AI feedback presentation
* Smooth frontend-backend interaction

---

## 🔮 Future Enhancements

* AI-powered mock interviews
* Voice-based interview practice
* ATS score calculation
* Job description vs. resume matching
* Personalized learning roadmap
* Company-specific interview preparation
* Interview performance tracking
* Resume improvement suggestions based on specific job descriptions

--

## 🎯 Project Objective

The primary objective of this project is to provide a centralized platform where users can leverage **Generative AI for resume improvement and interview preparation**.

The application combines:

**React + Node.js + JWT + Gemini AI**

to create a secure and interactive AI-powered job preparation platform.

---

## 👨‍💻 Author

### Aditya Gopal Nayak

**GitHub:**
https://github.com/Aditya-Gopal-Nayak

