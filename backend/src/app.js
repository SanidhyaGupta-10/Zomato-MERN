const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route')
const foodRoutes = require('./routes/food.route')
const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


// json, cookie-parser
app.use(express.json());
app.use(cookieParser());

app.get('/' , (req, res) => { // request and resolve
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);



module.exports = app;