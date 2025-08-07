require('dotenv').config();
const express = require('express');
const app = express();
PORT = process.env.PORT || 5000;
const db = require('./db');
const userRoutes = require('./routes/userRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const orderRoutes = require('./routes/orderRoute');
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/orders',orderRoutes)
app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
})