# 🎯 Task & Project Tracker (MERN Stack)

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://mongodb.com)
[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%26%20Express-339933.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248.svg)](https://mongodb.com)
[![Status](https://img.shields.io/badge/Assessment-100%25%20Completed-success.svg)]()

A high-performance, full-stack Task and Project Management platform developed using **MongoDB, Express.js, React.js, and Node.js**. Designed with modern engineering practices, clean modular architecture, dynamic metrics, and a glassmorphism UI.

---

## 📋 Assessment Requirements Coverage (100%)

| # | Requirement | Status | Implementation Details |
|---|---|---|---|
| 1 | **MERN Architecture** | ✅ Complete | Node/Express backend, React Vite frontend, MongoDB database |
| 2 | **Full CRUD Operations** | ✅ Complete | Create, Read, Update, Delete tasks with instant synchronization |
| 3 | **Task Properties** | ✅ Complete | Title, Description, Project/Category, Priority, Status, Due Date |
| 4 | **Priority Levels** | ✅ Complete | `Low`, `Medium`, `High` with color-coded badges |
| 5 | **Status Workflow** | ✅ Complete | `Pending`, `In Progress`, `Completed` with inline status toggle |
| 6 | **Dashboard Metrics** | ✅ Complete | Live calculation of Total Tasks, In Progress, Completed, Overdue |
| 7 | **Search System** | ✅ Complete | Real-time multi-field search across titles, descriptions, and projects |
| 8 | **Multi-Filtering** | ✅ Complete | Simultaneous filtering by status, priority, and deadline sorting |
| 9 | **Input Validation** | ✅ Complete | Client-side modal feedback + Mongoose schema validation |
| 10 | **Feedback & Toasts** | ✅ Complete | Dynamic Toast alerts for task create, update, delete, and error |
| 11 | **Loading State** | ✅ Complete | Animated spinner with graceful fallback during network requests |
| 12 | **Documentation & Setup** | ✅ Complete | Full setup guide, environment config, API documentation |

---

## 🚀 Key Features

- **⚡ Full Lifecycle CRUD**: Seamless task creation, detailed modal editing, quick inline status adjustments, and safe deletion with confirmation.
- **📊 Real-Time Metrics & Overdue Engine**: Automatic calculation of overdue tasks comparing due date against current UTC timestamp.
- **🔍 Precision Search & Filtering**: Instant search combined with priority filtering (`All`, `Low`, `Medium`, `High`) and status filtering (`All`, `Pending`, `In Progress`, `Completed`).
- **🔔 Interactive Toast Feedback**: Non-blocking toast alerts providing immediate visual confirmation for actions (Task created, updated, deleted, or error).
- **⏳ Polished Loading & Error States**: Smooth purple spinner during data fetches and informative error banners if network issues occur.
- **🎨 Glassmorphism & Modern UI**: Built with custom Vanilla CSS featuring dark gradients, backdrop blurs, responsive grids, and micro-animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Lucide React (Icons), Axios, Custom Responsive CSS
- **Backend**: Node.js, Express.js, CORS, Dotenv, DNS resolver fallback
- **Database**: MongoDB (Mongoose ODM) with support for MongoDB Atlas & Local Instances

---

## 📁 Project Structure

```text
Task-And-Project-Tracker/
├── client/                     # Frontend Application (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── DashboardCards.jsx  # Metric count cards (Total, In Progress, Completed, Overdue)
│   │   │   ├── FilterBar.jsx       # Search input, status/priority filters, sort selector
│   │   │   ├── Navbar.jsx          # Header with branding and "New Task" action button
│   │   │   ├── TaskCard.jsx        # Individual task card with status badge & action buttons
│   │   │   ├── TaskList.jsx        # Responsive grid layout and empty state handling
│   │   │   ├── TaskModal.jsx       # Create/Edit task modal dialog with field validation
│   │   │   └── Toast.jsx           # Animated floating notifications (Success/Error/Info)
│   │   ├── services/
│   │   │   └── api.js              # Axios HTTP client configuration and endpoint functions
│   │   ├── App.jsx                 # Main application controller, state management, toast handler
│   │   ├── index.css               # Design system, glassmorphism styling, and animations
│   │   └── main.jsx                # React DOM entrypoint
│   └── package.json
│
├── server/                     # Backend Application (Node + Express)
│   ├── config/
│   │   └── db.js                   # Mongoose connection with SRV DNS auto-fallback
│   ├── controllers/
│   │   └── taskController.js       # CRUD logic, query parameters, dashboard aggregation
│   ├── models/
│   │   └── Task.js                 # Mongoose schema with data validation rules
│   ├── routes/
│   │   └── taskRoutes.js           # RESTful API route definitions
│   ├── server.js                   # Express server entrypoint & middleware setup
│   └── package.json
│
└── README.md                   # Complete documentation
```

---

## 🗄️ Database Schema Design

The `Task` model in `server/models/Task.js` enforces the following structure:

```javascript
{
  title:       { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  project:     { type: String, required: true, trim: true, default: 'General' },
  priority:    { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status:      { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  dueDate:     { type: Date, required: true },
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   { type: Date, default: Date.now }
}
```

---

## ⚙️ Setup & Installation Instructions

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local Community Server **or** a free MongoDB Atlas cluster
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/prernas8107/Task-And-Project-Tracker.git
cd Task-And-Project-Tracker
```

### 3. Backend Setup
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server/` root:

**Option A — Local MongoDB:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskProjectTracker
```

**Option B — MongoDB Atlas (Cloud):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskProjectTracker?appName=Cluster0
```
> **Note:** Replace `<username>` and `<password>` with your MongoDB Atlas database user credentials. Ensure network access is configured (`0.0.0.0/0` or current IP).

Start the server:
```bash
npm run dev
```
Backend runs at: `http://localhost:5000`

### 4. Frontend Setup
In a new terminal window, navigate to the `client` directory:
```bash
cd client
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📡 RESTful API Reference

| HTTP Method | Route | Description | Query Parameters |
|---|---|---|---|
| `GET` | `/api/tasks` | Fetch tasks list | `search`, `status`, `priority`, `sortBy` |
| `GET` | `/api/tasks/stats` | Dashboard statistics | — |
| `GET` | `/api/tasks/:id` | Get task by ID | — |
| `POST` | `/api/tasks` | Create a new task | Request Body (JSON) |
| `PUT` | `/api/tasks/:id` | Update an existing task | Request Body (JSON) |
| `DELETE` | `/api/tasks/:id` | Remove a task | — |

---

## 🔮 Future Enhancements (Roadmap)
- **User Authentication**: JWT-based authentication with role-based permissions (Admin/Member).
- **Kanban Board View**: Drag-and-drop interface between status columns using React Beautiful DnD.
- **Server-Side Pagination**: Cursor or page-based pagination for enterprise datasets (10,000+ tasks).
- **Email / Webhook Alerts**: Automated notification triggers for tasks approaching their due date.
