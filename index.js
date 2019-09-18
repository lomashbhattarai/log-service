"use strict";

const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./api/routes');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res) => {
    res.json({'Status': 'Success'})
});

app.use('/navigation',routes.navigation);


mongoose.connect('mongodb+srv://lomash:Godfather@hiup-hgarc.mongodb.net/test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true
      });
let db= mongoose.connection
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`listening to port ${port}`)
    })
});
