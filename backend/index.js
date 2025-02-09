const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const AuthRouter=require("./Routes/AuthRouter")
const app = express();

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/auth',AuthRouter)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})