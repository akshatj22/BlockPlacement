const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    enrol:{
        type:Number,
    },
    branch:{
        type:String,
    }
});

module.exports = mongoose.model('Student' , studentSchema)