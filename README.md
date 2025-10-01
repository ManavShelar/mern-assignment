# 📌 MERN Task Manager

A full-stack MERN application  with authentication and task management.  
Built using MongoDB, Express, React (Vite), Node.js**, with JWT authentication, TailwindCSS, and Render deployment support.  

## 🚀 Features
- User authentication (register/login/logout) with JWT  
- Protected routes with role-based access (Admin, User)  
- Task CRUD (create, read, update, delete)  
- Responsive UI built with React + TailwindCSS  
- Backend API built with Express + MongoDB (Mongoose)  
- Environment-variable-driven configuration    

## 🛠 Tech Stack
- Frontend: React (Vite), TailwindCSS, Axios, React Router  
- Backend: Node.js, Express.js, MongoDB (Mongoose), JWT  
- Database: MongoDB Atlas   

## 📂 Project Structure

mern-assignment/
  ├── backend/          # Express + MongoDB API
  │   ├── models/       # Mongoose schemas
  │   ├── routes/       # API routes
  │   ├── controllers/  # Route controllers
  │   ├── middleware/   # Auth & error middleware
  │   ├── config/db.js  # MongoDB connection
  │   └── server.js     # App entry point
  │
  └── frontend/         # React (Vite) client
      ├── src/          # Components, pages
      ├── public/       # Static assets
      └── vite.config.js

## ⚙️ Environment Variables

### Backend (`/backend/.env`)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

### Frontend (`/frontend/.env`)

VITE_API_URL=http://localhost:5000

## 🖥 Local Development
```

### 1️⃣ Clone & install
```bash
git clone https://github.com/ManavShelar/mern-assignment.git
cd mern-assignment
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev  

## 🚀 Deployment (Render)
```
### Backend (Web Service)
- Build Command: `cd backend && npm install`  
- Start Command: `cd backend && npm start`  
- Env Vars:
```
  PORT=10000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_secret_key
  CLIENT_URL=https://your-frontend.onrender.com
```
### Frontend (Static Site)
- Build Command: `cd frontend && npm install && npm run build`  
- Publish Directory: `frontend/dist`  
- Env Vars:

  VITE_API_URL=https://your-backend.onrender.com

## 📄 API Endpoints

### Auth
- `POST /api/v1/auth/register` → register user  
- `POST /api/v1/auth/login` → login user  
- `POST /api/v1/auth/logout` → logout user  

### Tasks
- `GET /api/v1/tasks` → get all tasks (protected)  
- `POST /api/v1/tasks` → create task  
- `PUT /api/v1/tasks/:id` → update task  
- `DELETE /api/v1/tasks/:id` → delete task  

---

## ✅ Ready to Use
- Deploy backend first → get backend URL.  
- Deploy frontend → set `VITE_API_URL` to backend URL.  
- Update backend `CLIENT_URL` to frontend URL.  
 
