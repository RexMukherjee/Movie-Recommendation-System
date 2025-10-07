const express = require('express');
const connectDB = require('./config/database'); 
const cors = require('cors'); // ← Add this
const mongoose = require('mongoose');

const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 5000;


connectDB(); 

// ✅ Add CORS middleware - THIS IS THE FIX
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', loginRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});