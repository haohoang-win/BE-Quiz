const path = require('path');
const express = require('express');

const configViewEngine = (app) => {
    // config static files
    app.use(express.static(path.join('./src', 'public')))
}

module.exports = configViewEngine;