# Task & Project Tracker

> **Candidate:** Prerna Saini  
> **Role / Assessment:** Full Stack MERN Developer Assessment  
> **Repository:** [https://github.com/prernas8107/Task-And-Project-Tracker](https://github.com/prernas8107/Task-And-Project-Tracker)  
> **Tech Stack:** MongoDB, Express.js, React.js, Node.js (MERN)

---

## Project Overview

Task & Project Tracker is a full-stack productivity web application designed to help teams and individuals organize tasks, manage deadlines, and track project status in real time. 

Built with the MERN stack (MongoDB, Express, React, Node.js), the application features a clean, modern SaaS light dashboard interface inspired by modern productivity tools. It delivers full CRUD functionality, real-time statistics, multi-criteria filtering, instantaneous search, form validation, and reactive toast notifications.

---

##  Features Implemented

### 1. Task & Project Management (CRUD)
- **Create Tasks:** Modal form with title, detailed description, project/category selection, priority level, status, and deadline.
- **Read & View:** Responsive card grid displaying task title, description, project badge, priority badge, formatted deadline, and status dropdown.
- **Edit & Update:** Edit any existing task with pre-filled modal fields and instant data synchronization.
- **Delete with Confirmation:** Safe deletion with confirmation prompt to prevent accidental data loss.
- **Inline Status Toggling:** Quick status change (Pending → In Progress → Completed) directly from the card dropdown without opening the modal.

### 2. Live Dashboard & Metrics
- **Real-Time Counters:** Instant summary cards showing:
  - **Total Tasks**
  - **Pending Tasks**
  - **In Progress Tasks**
  - **Completed Tasks**
  - **Overdue Tasks** (dynamically computed by comparing deadlines against current date for non-completed items).
- Automatically updates as tasks are added, modified, or deleted.

### 3. Search, Filter & Sorting System
- **Global Search:** Case-insensitive search running across task titles, descriptions, and project names simultaneously.
- **Multi-Filter:** Filter by Status (`All`, `Pending`, `In Progress`, `Completed`) and Priority (`All`, `Low`, `Medium`, `High`) simultaneously.
- **Deadline Sorting:** Sort tasks by deadline (Soonest first or Latest first) or by newest created.

### 4. User Experience & Feedback
- **Toast Notifications:** Floating feedback alerts for task creation, updates, status changes, deletions, and network errors.
- **Loading State:** Centered animated spinner during data fetching.
- **Form Validation:** Real-time client-side checks for required fields (Title and Deadline) with red error messages, backed by Mongoose schema-level validation.
- **Modern UI & Typography:** Clean light-themed SaaS dashboard with Google Font `Inter`, pastel status badges, and smooth hover micro-animations.

---

##  Tech Stack & Architecture

### Frontend (`/client`)
- **React.js 18 (Vite):** Functional components and React Hooks (`useState`, `useEffect`, `useCallback`) for clean state management.
- **Axios:** Centralized API service layer (`services/api.js`) for HTTP requests.
- **Lucide React:** Lightweight SVG iconography.
- **Vanilla CSS:** Fully custom design system (`index.css`) with CSS variables, responsive grid, and zero reliance on heavy CSS frameworks.

### Backend (`/server`)
- **Node.js & Express.js:** RESTful API server with modular separation of concerns (Controllers, Models, Routes).
- **Mongoose ODM:** Strict schema validation, sanitization, and query building.
- **MongoDB:** Database supporting both local instances and cloud-hosted MongoDB Atlas clusters.
- **Dotenv & CORS:** Configurable environment management and cross-origin resource sharing.

---

##  Project Directory Structure

```text
Task-And-Project-Tracker/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardCards.jsx  # Metric cards (Total, Pending, In Progress, Completed, Overdue)
│   │   │   ├── FilterBar.jsx       # Real-time search, status/priority filter, sorting
│   │   │   ├── Navbar.jsx          # Top brand header and 'Add Task' trigger
│   │   │   ├── TaskCard.jsx        # Task item with priority badge, date, inline status selector
│   │   │   ├── TaskList.jsx        # Responsive task card grid & empty state handler
│   │   │   ├── TaskModal.jsx       # Modal dialog for task creation and editing with validation
│   │   │   └── Toast.jsx           # Animated floating notification component
│   │   ├── services/
│   │   │   └── api.js              # Centralized Axios API client & endpoints
│   │   ├── App.jsx                 # Main application controller & state orchestrator
│   │   ├── index.css               # Design system, Inter typography, colors, animations
│   │   └── main.jsx                # React DOM entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js                   # MongoDB connection logic with DNS fallback for Atlas SRV
│   ├── controllers/
│   │   └── taskController.js       # CRUD operations, query builder, stats aggregation
│   ├── models/
│   │   └── Task.js                 # Mongoose schema with field validation & defaults
│   ├── routes/
│   │   └── taskRoutes.js           # RESTful API route definitions
│   ├── .env                        # Environment configuration (PORT, MONGO_URI)
│   ├── package.json
│   └── server.js                   # Express application bootstrap & middleware setup
│
├── .gitignore
└── README.md                       # Project documentation
```

---

##  Database Schema (`Task.js`)

```javascript
{
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  project: {
    type: String,
    required: [true, 'Project/Category is required'],
    trim: true,
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  },
  deadline: {
    type: Date,
    required: [true, 'Deadline date is required']
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

---

##  Installation & Setup Guide

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (comes with Node.js)
- **MongoDB** (Local MongoDB Server or MongoDB Atlas account)
- **Git**

### 2. Clone Repository
```bash
git clone https://github.com/prernas8107/Task-And-Project-Tracker.git
cd Task-And-Project-Tracker
```

### 3. Backend Setup
1. Navigate to the `server` directory and install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file inside the `server/` folder:

   **For Local MongoDB:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/taskProjectTracker
   ```

   **For MongoDB Atlas (Cloud):**
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskProjectTracker?retryWrites=true&w=majority&appName=Cluster0
   ```
   > *Note:* Replace `<username>` and `<password>` with your Atlas credentials. Ensure your IP address is whitelisted in MongoDB Atlas Network Access (`0.0.0.0/0` allows access from any network).

3. Start the backend development server:
   ```bash
   npm run dev
   ```
   Backend will be running on: `http://localhost:5000`

### 4. Frontend Setup
1. Open a new terminal window, navigate to the `client` directory, and install dependencies:
   ```bash
   cd client
   npm install
   ```

2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Frontend will be running on: `http://localhost:5173`

---

##  RESTful API Reference

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Description | Query Parameters / Body |
|---|---|---|---|
| `GET` | `/api/tasks` | Fetch all tasks with optional filters | `search`, `status`, `priority`, `sortBy` |
| `GET` | `/api/tasks/stats` | Fetch dashboard metrics | None |
| `GET` | `/api/tasks/:id` | Fetch single task by ID | None |
| `POST` | `/api/tasks` | Create a new task | JSON body (`title`, `description`, `project`, `priority`, `status`, `deadline`) |
| `PUT` | `/api/tasks/:id` | Update an existing task | JSON body with fields to update |
| `DELETE` | `/api/tasks/:id` | Delete a task | None |

### Sample Request: Create Task (`POST /api/tasks`)
```json
{
  "title": "Design Database Schema",
  "description": "Create ER diagram and write Mongoose models for tasks and projects.",
  "project": "Backend",
  "priority": "High",
  "status": "In Progress",
  "deadline": "2026-10-25"
}
```

### Sample Response: Dashboard Stats (`GET /api/tasks/stats`)
```json
{
  "success": true,
  "data": {
    "total": 12,
    "completed": 5,
    "pending": 4,
    "inProgress": 3,
    "overdue": 1
  }
}
```

---

##  Decisions & Challenges Handled

1. **MongoDB Atlas SRV DNS Resolution:**
   - On certain Windows networks and local ISP configurations, Node.js `dns.promises.resolveSrv` encounters `ECONNREFUSED` when querying MongoDB Atlas SRV records.
   - **Solution:** Configured Google public DNS servers (`8.8.8.8`, `8.8.4.4`) in `server/config/db.js` before initializing Mongoose, ensuring rock-solid Atlas connectivity regardless of local router DNS limitations.

2. **Dynamic Overdue Computation:**
   - Overdue tasks are determined by comparing the task deadline with the current timestamp (`deadline < now && status !== 'Completed'`).
   - Rather than storing a static boolean that easily gets stale in the database, the overdue count is computed dynamically on the server aggregation endpoint and flagged visually on the frontend card.

3. **Compound Multi-Filtering:**
   - Built a dynamic MongoDB query builder in `taskController.js` that compounds search strings (`$regex` matching title, description, or project), status filters, and priority filters into a single efficient query.

4. **Component State Management:**
   - Used React's `useCallback` for non-blocking toast notifications and modal state orchestration to ensure smooth re-renders and optimal performance.

---

## Future Roadmap (Production Scalability)
- **User Authentication & RBAC:** JWT-based login/signup with individual user data isolation.
- **Pagination:** Cursor/offset-based server pagination for handling large datasets (10,000+ tasks).
- **Automated Deadline Notifications:** Background cron job sending email reminders 24 hours before deadlines.
