const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 

let User = new Schema({
    username: {type: String},
    password: {type: String},
    notes: {
        date_modified: {type: String},
        note_title: {type: String},
        note_text: {type: String}
    }
})

module.exports = mongoose.model('User', User);