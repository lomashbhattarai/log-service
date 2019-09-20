"use strict";

const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./api/routes');
const mongoose = require('mongoose');
const cors = require('cors');
const userVisit = require('./api/model/userVisit');

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
  let server = app.listen(port, () => {
    console.log(`listening to port ${port}`)
    })
    const io = require('socket.io')(server);
    io.on('connection',(socket) => {
      console.log("connected established")
      socket.on('newVisit', function (data, fn) {
        console.log("new visit")
        let newVisit = new  userVisit(data)
        newVisit.save((err, user) => {
          if(!err) {      
            fn({trackerId: user._id })
           }
        })
      })
      socket.on('updateTime', async (data,fn) => {
        console.log("udatetiem")
        let { trackerId , exitDate } = data
        if(trackerId && exitDate){
          const filter = { _id: trackerId}
          const update = { exitDate }
          let doc = await userVisit.findOneAndUpdate(filter, update,{
            new: true
          })
          fn(doc)
        }
        else {
          console.log("not found")
          fn(false)
        }
        

    })
    })
    

});
