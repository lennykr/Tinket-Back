const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
        app.listen(port, () => {
            console.log(`Listening on http://127.0.0.1:${port}`);
        });
    })
    .catch((err) => console.error(`Failed to connect to database. Error: ` + err));
