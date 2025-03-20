require('dotenv').config();
require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoMemoryServer } = require('mongodb-memory-server');
const authRoutes = require('./routes/auth');
const snippetRoutes = require('./routes/snippets');
const { errorHandler } = require('./middleware/errorHandler');
const { authenticateUser } = require('./middleware/auth');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/snippets', authenticateUser, snippetRoutes);
app.use('/public/snippets', require('./routes/publicSnippets'));

// Error handling middleware
app.use(errorHandler);

// Start server with MongoDB in-memory server for development
const startServer = async () => {
  try {
    // Create an in-memory MongoDB server
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory MongoDB server
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB');
    
    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
