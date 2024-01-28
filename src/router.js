const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');

const { insertDetails } = require("./storeUserDetails");
const { runAiScript } = require('./talkToPython');

const ROOT_DIR = path.resolve();

const serveBookHome = (_, res) => {
  const filePath = `${ROOT_DIR}/Flipbook/index.html`;
  res.sendFile(filePath);
};

const serveTv = (_, res) => {
  const filePath = `${ROOT_DIR}/Flipbook/indexTv.html`;
  res.sendFile(filePath);
};

const handleBookDetails = (req, res) => {
  console.log(req.body, "BBOOOOOOOOOOOOK");
  const bookDetails = req.body;
  fs.writeFileSync('./user_resource/book_preference.json', JSON.stringify(bookDetails));
  runAiScript();
  res.sendStatus(200);
}

const serverLetter = (req, res) => {
  const filePath = `${ROOT_DIR}/Flipbook/letter.html`;
  res.sendFile(filePath)
}

const sendList = (_, res) => {
  const list = fs.readFileSync('./user_resource/recommendation.txt', 
  'utf-8')
  console.log(JSON.stringify({list}))
  res.send(list);
}

const createApp = () => {
    // Create a new Express application.
    const app = express();
    app.use(bodyParser.json())
    
    app.get("/", serveBookHome);
    app.get("/tv", serveTv);
    app.post("/submitBook", handleBookDetails);
    app.post("/submit", insertDetails)
    app.get('/letter', serverLetter)
    app.get('/recommend', sendList)
    app.use(express.static("FlipBook"));

    return app;
}

module.exports = {createApp};