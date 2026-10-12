const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline date is required']
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: 'Priority must be Low, Medium, or High'
      },
      default: 'Medium'
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Pending', 'In Progress', 'Completed'],
        message: 'Status must be Pending, In Progress, or Completed'
      },
      default: 'Pending'
    },
    project: {
      type: String,
      trim: true,
      default: 'General' // Bonus requirement: Categorization
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Task', taskSchema);
