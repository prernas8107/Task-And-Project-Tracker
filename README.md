# Task & Project Tracker (MERN Stack)

A full-stack Task and Project Management web application built with MongoDB, Express.js, React.js, and Node.js.

---

## Project Overview

Task & Project Tracker is a productivity web application designed to help teams and individuals organize tasks, manage deadlines, track priorities, and monitor project workflows in real time.

### Key Features
- **Full CRUD Operations:** Create, view, edit, and delete tasks with instant UI updates.
- **Task Categorization:** Organize tasks by project/category (Frontend, Backend, UI/UX Design, Database, QA & Testing, DevOps, General).
- **Priority & Status Management:** Priorities (Low, Medium, High) and statuses (Pending, In Progress, Completed) with inline status dropdown toggles.
- **Live Metrics Dashboard:** Real-time counters showing Total Tasks, Pending Tasks, In Progress Tasks, Completed Tasks, and Overdue Tasks (dynamically computed).
- **Search, Filtering & Sorting:** Instant case-insensitive search across titles, descriptions, and projects, multi-criteria filtering by priority and status, and sorting by deadline.
- **Form Validation:** Real-time field validation for required inputs (title, deadline) with clear error messaging.
- **Interactive Feedback:** Non-blocking floating toast alerts for actions and an animated loading spinner during API calls.
- **Modern UI:** Clean, light SaaS dashboard interface built with custom CSS and Google Font Inter.

---

## Project Explanation

This application is built using a decoupled MERN stack architecture with strict separation of concerns between client and server:
- **Approach:** Focused on clean component composition, predictable state management via React Hooks, and resilient database operations.
- **Component Structure:** Organized into modular components (Navbar, DashboardCards, FilterBar, TaskList, TaskCard, TaskModal, Toast) orchestrated by App.jsx and connected through a centralized API service layer (services/api.js).
- **API & Database Implementation:** RESTful endpoints built with Express routes and controllers, paired with a Mongoose schema enforcing strict data validation and a dynamic overdue calculation engine.
- **Future Improvements:** With additional time, I would incorporate JWT-based user authentication and role-based permissions (RBAC) to support multi-tenant team workspaces.

---

## Tech Stack

- **Frontend:** React.js 18, Vite, Axios, Lucide Icons, Vanilla CSS
- **Backend:** Node.js, Express.js, CORS, Dotenv, DNS resolver
- **Database:** MongoDB with Mongoose ODM (compatible with local MongoDB & MongoDB Atlas)

---

## Project Structure

```text
Task-And-Project-Tracker/
├── client/                         # Frontend Application (React 18 + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardCards.jsx  # Metric cards (Total, Pending, In Progress, Completed, Overdue)
│   │   │   ├── FilterBar.jsx       # Search input, status & priority filters, sorting
│   │   │   ├── Navbar.jsx          # Header with branding and 'Add Task' button
│   │   │   ├── TaskCard.jsx        # Task card with priority badge, date, inline status selector
│   │   │   ├── TaskList.jsx        # Responsive grid layout and empty state handler
│   │   │   ├── TaskModal.jsx       # Modal dialog for task creation and editing with validation
│   │   │   └── Toast.jsx           # Animated floating notification component
│   │   ├── services/
│   │   │   └── api.js              # Centralized Axios API client & endpoints
│   │   ├── App.jsx                 # Root application state & controller
│   │   ├── index.css               # Custom design system, Inter typography, animations
│   │   └── main.jsx                # React DOM entrypoint
│   ├── package.json
│   └── vite.config.js
│
├── server/                         # Backend Application (Node.js + Express)
│   ├── config/
│   │   └── db.js                   # Mongoose connection with DNS fallback
│   ├── controllers/
│   │   └── taskController.js       # CRUD operations, query builder, stats aggregation
│   ├── models/
│   │   └── Task.js                 # Mongoose schema with validation rules
│   ├── routes/
│   │   └── taskRoutes.js           # REST API routes
│   ├── .env                        # Environment configuration
│   ├── package.json
│   └── server.js                   # Express server bootstrap & middleware
│
├── .gitignore
└── README.md
```

---

## Database Schema

```javascript
{
  title:       { type: String, required: [true, 'Task title is required'], trim: true },
  description: { type: String, trim: true, default: '' },
  project:     { type: String, required: [true, 'Project is required'], default: 'General' },
  priority:    { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  deadline:    { type: Date, required: [true, 'Deadline date is required'] },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
```

---

## Installation & Setup Guide

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- MongoDB (Local MongoDB Server or MongoDB Atlas account)
- Git

### 2. Clone the Repository
```bash
git clone https://github.com/prernas8107/Task-And-Project-Tracker.git
cd Task-And-Project-Tracker
```

### 3. Backend Setup
1. Navigate to the server directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a .env file in the server/ directory:

   **Option A - Local MongoDB:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskProjectTracker
   ```

   **Option B - MongoDB Atlas (Cloud):**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskProjectTracker?retryWrites=true&w=majority&appName=Cluster0
   ```
   *(Note: Replace <username> and <password> with your Atlas credentials. Make sure your IP is whitelisted in Atlas Network Access).*

3. Start the backend server:
   ```bash
   npm run dev
   ```
   Backend runs on: http://localhost:5000

### 4. Frontend Setup
1. Open a new terminal window, navigate to the client directory, and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the frontend development server:
   ```bash
   npm run dev
   ```
   Frontend runs on: http://localhost:5173

---

## RESTful API Reference

Base URL: http://localhost:5000/api/tasks

| Method | Endpoint | Description | Query Parameters / Body |
|---|---|---|---|
| GET | /api/tasks | Fetch all tasks with optional filters | search, status, priority, sortBy |
| GET | /api/tasks/stats | Fetch dashboard metrics | None |
| GET | /api/tasks/:id | Fetch single task by ID | None |
| POST | /api/tasks | Create a new task | JSON (title, description, project, priority, status, deadline) |
| PUT | /api/tasks/:id | Update an existing task | JSON with fields to update |
| DELETE | /api/tasks/:id | Delete a task | None |

### Sample Request: Create Task (POST /api/tasks)
```json
{
  "title": "Build Authentication Module",
  "description": "Implement JWT login and registration with Bcrypt hashing",
  "project": "Backend",
  "priority": "High",
  "status": "In Progress",
  "deadline": "2026-10-20"
}
```

### Sample Response: Dashboard Stats (GET /api/tasks/stats)
```json
{
  "success": true,
  "data": {
    "total": 8,
    "completed": 3,
    "pending": 3,
    "inProgress": 2,
    "overdue": 1
  }
}
```

