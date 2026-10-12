const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);



// Root test route
app.get('/', (req, res) => {
  res.json({ message: 'Task & Project Tracker API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});
