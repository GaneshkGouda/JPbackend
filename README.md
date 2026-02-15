# 🚀 TalentSync — Job & Talent Management Platform

A **production-ready backend system** for managing job postings, candidate applications, and recruiter workflows with **secure authentication, Redis caching, async queues, and real email notifications**.

---

## 🌐 Live Demo
> Add after deployment  
`https://your-backend-url.onrender.com`

---

## 🧠 Key Features

### 🔐 Authentication & Authorization
- JWT-based secure authentication  
- Role-based access control (**Candidate / Recruiter / Admin**)  
- Protected REST APIs  

### 💼 Job & Application Management
- Recruiters can create, update, and manage jobs  
- Candidates can apply and track application status  
- Recruiter-controlled lifecycle:  
  **APPLIED → SHORTLISTED → REJECTED → HIRED**

### ⚡ Performance & Scalability
- **Redis caching** for read-heavy job listings  
- **BullMQ queues** for asynchronous background processing  
- **Worker services** for non-blocking execution  

### 📧 Async Email Notifications
- Real email delivery using **Nodemailer**  
- Triggered via **queue events**  
- **Retry with exponential backoff** for reliability  

### 📊 Queue Monitoring
- Integrated **Bull Board dashboard**  
- View waiting, active, completed, and failed jobs  

---

## 🏗️ Tech Stack

**Backend**
- Node.js  
- Express.js  

**Database & Cache**
- MongoDB Atlas  
- Redis Cloud  

**Async Processing**
- BullMQ  
- Worker Processes  

**Security**
- JWT Authentication  
- Role-based Authorization  

**Email**
- Nodemailer (Gmail App Password)

**Deployment**
- Render (Backend Hosting)

---

## 📁 Project Structure

src/
├── config/ # DB, Redis, Queue, Email, Bull Board
├── controllers/ # Business logic
├── middleware/ # Auth & role protection
├── models/ # Mongoose schemas
├── routes/ # API routes
├── workers/ # BullMQ background workers
└── server.js # App entry point

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
REDIS_PASSWORD=your_redis_password

JWT_SECRET=your_secret

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
