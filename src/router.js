const express = require("express");
const bodyParser = require('body-parser');
const { insertDetails } = require("./storeUserDetails");
const path = require('path');

const ROOT_DIR = path.resolve();

const serveHome = (_, res) => {
  const filePath = `${ROOT_DIR}/television/index.html`;
  res.sendFile(filePath);
};


const createApp = () => {
    // Create a new Express application.
    const app = express();
    app.use(bodyParser.json())
    
    app.get("/", serveHome);
    app.post("/submit", insertDetails)
    app.use(express.static("television"));

    return app;
}

module.exports = {createApp};