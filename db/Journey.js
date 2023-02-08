const mongoose = require('mongoose');
const User = require('./User');


const journeySchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    img: {
        data: Buffer,
        contentType: String
    },

    owner: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// Set EJS as templating engine
// app.set("view engine", "ejs");

module.exports = mongoose.model('Journey', journeySchema)