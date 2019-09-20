const mongoose = require('mongoose');

const userVisitSchema = mongoose.Schema({
    browser: { type: String },
    navigator: { type: Object },
    newVisitDate : { type: Date },
    exitDate:  { type: Date } 
})
userVisitSchema.virtual('timeSpent').get(function () {
    return this.name.first - this.newVisitDate;
  });


module.exports = mongoose.model('userVisit',userVisitSchema);
