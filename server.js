
// importing express module
require('dotenv').config();
const express = require('express');
const route = require('./routes');
const mongoose = require("mongoose");


// create instance of express
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// Defining routes for url paths
app.use('/api/v1/products', route);
 
//const Mongo_url = "mongodb+srv://varunbhargav26006_db_user:varun1234@cluster0.pe62hvb.mongodb.net/?appName=Cluster0"

// mongoose connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// start the server and listen on port 5000
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:7000');
}) ;



