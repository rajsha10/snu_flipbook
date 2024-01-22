const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const { insertUser, displayAll } = require('./userdb'); // Import insertUser and displayAll functions

const app = express();
const PORT = process.env.PORT || 5500;

// MongoDB connection URI. Replace 'your_database_uri' with your actual MongoDB URI.
const mongoURI = 'mongodb+srv://manjeet0796:manjeet0796@cluster0.irnuxnb.mongodb.net/?retryWrites=true&w=majority';
let db;

MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
    db = client.db();
  }
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to handle form submission at ch03
app.post('/submitDetails', (req, res) => {
  const { name, phone, email } = req.body;

  if (!name || !phone || !email) {
    return res.status(400).json({ error: 'Incomplete data' });
  }

  // Insert data into MongoDB
  const detailsCollection = db.collection('details');
  detailsCollection.insertOne({ name, phone, email }, (err, result) => {
    if (err) {
      console.error('Error inserting data into MongoDB:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    console.log('Data inserted into MongoDB:', result.ops[0]);

    // Insert data into userdb.js
    const user = { name, phone, email };
    insertUser(user);

    res.status(200).json({ message: 'Data stored successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
