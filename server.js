const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory storage for tasks
let tasks = [
  { id: 1, title: 'Sample Task', completed: false, createdAt: new Date().toISOString() },
  { id: 2, title: 'Learn Node.js', completed: true, createdAt: new Date().toISOString() }
];
let taskIdCounter = 3;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Routes
// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json({
    success: true,
    data: tasks
  });
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Title is required'
    });
  }

  const newTask = {
    id: taskIdCounter++,
    title: title.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };

  tasks.push(newTask);
  
  res.status(201).json({
    success: true,
    data: newTask
  });
});

// Update a task
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, completed } = req.body;
  
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  if (title !== undefined) {
    if (title.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Title cannot be empty'
      });
    }
    tasks[taskIndex].title = title.trim();
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = Boolean(completed);
  }

  tasks[taskIndex].updatedAt = new Date().toISOString();

  res.json({
    success: true,
    data: tasks[taskIndex]
  });
});

// Delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Task not found'
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedTask
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for API routes
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view the application`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = app;