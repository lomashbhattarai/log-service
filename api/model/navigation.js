const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
        userId: {type: String, required: true},
        username: {type: String},
        firstName: {type: String},
        lastName: {type: String}
})

const NavigationSchema = mongoose.Schema({
    user:  userSchema ,
    to: { type: Object},
    from: { type: Object},
    timeSpent: { type: Number }
},{ timestamps: {}});

module.exports = mongoose.model('Navigation',NavigationSchema);
