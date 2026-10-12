# Task & Project Tracker (MERN Stack)

A modern full-stack Task and Project Management application built with MongoDB, Express.js, React.js, and Node.js.

## Key Features
- **Full CRUD Operations**: Create, view, edit, and delete tasks seamlessly.
- **Priority & Status Management**: Priorities (Low, Medium, High) and Statuses (Pending, In Progress, Completed).
- **Live Dashboard Cards**: Instant metrics showing Total Tasks, In Progress, Completed, and Overdue tasks.
- **Search & Multi-Filtering**: Search across titles/descriptions/projects, filter by priority and status, and sort by deadline.
- **Form Validation**: Real-time error messages and required field checks.
- **Toast Notifications**: Interactive feedback toasts for task creation, updates, and deletion.
- **Loading State & Error Handling**: Animated loading spinner during API fetches and clean error alerts.
- **Responsive & Modern UI**: Built with a sleek dark glassmorphism theme, responsive grid, and smooth interactive elements.

## Tech Stack
- **Frontend**: React.js (Functional Components, Hooks), Vite, Lucide Icons, Axios, Vanilla CSS
- **Backend**: Node.js, Express.js, RESTful APIs
- **Database**: MongoDB with Mongoose ODM (supports both local and MongoDB Atlas)

---

## Setup & Installation Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local Community Server **or** MongoDB Atlas URI)
- Git

### 2. Clone Repository
```bash
git clone https://github.com/prernas8107/Task-And-Project-Tracker.git
cd Task-And-Project-Tracker
```

### 3. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

**Option A - Local MongoDB:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskProjectTracker
```

**Option B - MongoDB Atlas (Recommended):**
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskProjectTracker?appName=Cluster0
```
> Note: Replace `<username>` and `<password>` with your Atlas credentials. Make sure your IP is whitelisted in Atlas Network Access (or use `0.0.0.0/0` to allow all).

Start the backend server:
```bash
npm run dev
```
*(Server will start on http://localhost:5000)*

### 4. Frontend Setup
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
*(Frontend will run on http://localhost:5173)*

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | Get all tasks (supports query params: `search`, `status`, `priority`, `sortBy`) |
| `GET` | `/api/tasks/stats` | Get dashboard summary metrics (total, inProgress, completed, overdue) |
| `GET` | `/api/tasks/:id` | Get single task details |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update an existing task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## Project Explanation (Summary)
This Task & Project Tracker was developed using the MERN stack with a clean, decoupled modular architecture. The backend is powered by Node.js and Express.js with Mongoose schemas that enforce strict data validation, providing RESTful endpoints for CRUD operations, live dashboard metrics (including dynamic overdue calculation), and multi-criteria querying. The frontend is built in React using functional components and hooks (`useState`, `useEffect`, `useCallback`) for state management, modal dialogs, loading states, real-time toast feedback, and validation. If given more time, future roadmap items would include user authentication with JWT, drag-and-drop Kanban view, pagination for large datasets, and automated email reminders for approaching deadlines.
