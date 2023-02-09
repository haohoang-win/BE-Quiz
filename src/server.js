require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine')
const apiRoutes = require('./routes/apiV1');
const cors = require('cors')
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser')
const { configCors } = require('./config/cors')

// import express from "express"
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

app.use(cors({
    origin: true,
    credentials: true,
}))
// configCors(app)

// default options
app.use(fileUpload());

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template view engine
configViewEngine(app);

app.use(cookieParser())

// config render
app.enable('trust proxy')

// khai bao route
app.use('/v1/api/', apiRoutes);

// test connection
(async () => {
    try {
        // Using Mongoose
        await connection();

        app.listen(port, hostname, () => {
            console.log(`Example app listening on port ${port}`)
        });
    } catch (error) {
        console.log('Error connect to DB: ', error);
    }
})()