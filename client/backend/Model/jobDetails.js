const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    cName : {
        type:String,
    },
    cg:{
        type: String,
    },
    branchAllowed:{
        type:String,
    }
})

module.exports = mongoose.model('Job',jobSchema);