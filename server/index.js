const express = require('express');
const connectDB = require('./config/database'); 
const cors = require('cors');

const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// ✅ CORS FIX
const allowedOrigins = [
  'http://localhost:3000',
  'https://obscura.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use('/api/auth', loginRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});