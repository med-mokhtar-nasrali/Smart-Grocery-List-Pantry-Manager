const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pantryRoutes = require('./routes/pantryRoutes');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


// Connect to MongoDB
connectDB();

// TODO: Add routes here
app.use('/api/auth', authRoutes);
app.use('/api/pantry', pantryRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
