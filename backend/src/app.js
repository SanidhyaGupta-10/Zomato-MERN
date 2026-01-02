const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route')
const foodRoutes = require('./routes/food.route')


// json, cookie-parser
const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/' , (req, res) => { // request and resolve
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);



module.exports = app;