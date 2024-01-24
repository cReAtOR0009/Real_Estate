const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
const dbConnection = require('./database/connection');

dotEnv.config();

//initialize express framework
const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

//using json
app.use(express.json());
//cors
app.use(cors());

app.use(express.urlencoded({ extended: true }));


const myMiddleware = (req, res, next) => {
    console.log('Server Request');
    next();
}



//show a simple text for browser access
app.get('/', myMiddleware, (req, res, next) => res.send('Nodejs Server is Running'));

app.use((err, res, req, next) => {
    res.status(500).send({
        status: 500,
        message: err.message,
        data: {}
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
