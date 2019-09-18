'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Navigation = require('../model/navigation')

router.post('/', (req,res) => {
    console.log("post request")
    let navigationData = req.body;
    console.log(navigationData);
    let navigation = new Navigation(navigationData);
    console.log(navigation)
    navigation.save((err,user) => {
        if(err) {
            return res.status(400).json(err);
        }
        return res.status(200).json({"status":"success"})
    })
    
})

module.exports = router;