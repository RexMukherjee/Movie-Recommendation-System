const express = require('express');
const loginRoutes = require('./routes/login');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use('/api/auth', loginRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});