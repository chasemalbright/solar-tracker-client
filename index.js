require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path')
const connectDB = require('./db');
const bodyParser = require("body-parser");
const { default: axios } = require("axios");

//connectDB(); // test mongo connection

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// api code here
// will save data based on phone number

app.post('/data', async (req, res) => {
    const q = JSON.stringify(req.body.q);

    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.KEY}&q=${q}`)
    .then(response => {
        res.send(JSON.stringify(response.data));
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    
})

let randomNumber = -1;

setInterval(() => {
  // Log the random number every 5 seconds
  randomNumber = Math.floor(Math.random() * 100) + 1;
  console.log('Random Number:', randomNumber);
}, 1000);

app.get("/url", (req, res, next) => {
  res.json(randomNumber);
});





if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
    })
  } else {
    app.get('/', (req, res) => {
        res.send('Api running')
    })
  }
  
  app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));