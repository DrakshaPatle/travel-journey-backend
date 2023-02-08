const mongoose= require('mongoose');
const Journey = require('./Journey');


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    journeys: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Journey"
    }]
});


module.exports = mongoose.model('User',userSchema)