const Task = require('../models/Task');

//     Get all tasks with Search, Filter & Sort
//   GET /api/tasks
exports.getTasks = async (req, res) => {
    try {
        const { status, priority, search, sortBy } = req.query;
        let query = {};

        // Filter by status
        if (status && status !== 'All') {
            query.status = status;
        }

        // Filter by priority
        if (priority && priority !== 'All') {
            query.priority = priority;
        }

        // Search by title or description
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { project: { $regex: search, $options: 'i' } }
            ];
        }

        // Sorting logic (Bonus)
        let sortOptions = { createdAt: -1 };
        if (sortBy === 'deadline_asc') sortOptions = { deadline: 1 };
        if (sortBy === 'deadline_desc') sortOptions = { deadline: -1 };

        const tasks = await Task.find(query).sort(sortOptions);
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//   Get dashboard summary statistics
//    GET /api/tasks/stats
exports.getTaskStats = async (req, res) => {
    try {
        const now = new Date();
        const total = await Task.countDocuments();
        const completed = await Task.countDocuments({ status: 'Completed' });
        const pending = await Task.countDocuments({ status: 'Pending' });
        const inProgress = await Task.countDocuments({ status: 'In Progress' });

        // Overdue tasks: deadline < now AND status is not Completed
        const overdue = await Task.countDocuments({
            deadline: { $lt: now },
            status: { $ne: 'Completed' }
        });

        res.status(200).json({
            success: true,
            data: { total, completed, pending, inProgress, overdue }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//     Get single task by ID
//   GET /api/tasks/:id
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create new task
//   POST /api/tasks
exports.createTask = async (req, res) => {
    try {
        const { title, description, deadline, priority, status, project } = req.body;

        if (!title || !deadline) {
            return res.status(400).json({ success: false, message: 'Title and deadline are required fields.' });
        }

        const task = await Task.create({
            title,
            description,
            deadline,
            priority: priority || 'Medium',
            status: status || 'Pending',
            project: project || 'General'
        });

        res.status(201).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//     Update task
//    PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

//    Delete task
//    DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
