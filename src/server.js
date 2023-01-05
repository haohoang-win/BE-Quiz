require('dotenv').config();
const express = require('express');
const connection = require('./config/database');
const configViewEngine = require('./config/viewEngine')
const apiRoutes = require('./routes/apiV1');

// import express from "express"
const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data

// config template view engine
configViewEngine(app);

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