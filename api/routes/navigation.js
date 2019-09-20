'use strict';

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Navigation = require('../model/navigation')

router.post('/', (req,res) => {
    let navigationData = req.body;
    let navigation = new Navigation(navigationData);
    navigation.save((err,user) => {
        if(err) {
            return res.status(400).json(err);
        }
        return res.status(200).json({"status":"success"})
    })
    
})

module.exports = router;