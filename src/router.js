const express = require("express");
const path = require('path');

const ROOT_DIR = path.resolve();

const serveHome = (_, res) => {
  const filePath = `${ROOT_DIR}/television/index.html`;
  res.sendFile(filePath);
};


const createApp = () => {
    // Create a new Express application.
    const app = express();
    
    app.get("/", serveHome);
    app.use(express.static("television"));

    return app;
}

module.exports = {createApp};