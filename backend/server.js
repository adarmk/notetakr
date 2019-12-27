const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = express.Router();
const PORT = 4000; 

app.use(cors()); 
app.use(bodyParser.json()); 
app.use('/notes', userRoutes)

//API endpoint for listing all of user's notes
userRoutes.route('/').get(function(req, res) {
    User.notes.find(function(err, notes) {
        if (err) {
            console.log(err);
        } else {
            res.json(notes); 
        }
    });
});

//API endpoint for retrieving one note
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    User.notes.findById(id, function(error, note) {
        res.json(note); 
    }); 
}); 

//Route for creating new note
userRoutes.route('/add').post(function(req, res) {
    let note = new note(req.body);
    note.save()
        .then(note => {
            res.status(200).json({'note': 'note added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new note failed');
        });
});

//Route for updating note
/*userRoutes.route('/update/:id').post(function(req, res) {
    User.notes.findById(req.params.id), function(err, note) {
        if (!note)
            res.status(404).send("data is not found"); 
        else 

            note.date_modified = 
    }
})
)*/


mongoose.connect('mongodb://127.0.0.1:27017/notes', {useNewUrlParser: true}); 
const connection = mongoose.connection; 

connection.once('open', function () {
    console.log("MongoDB database connection established successfully"); 
})

app.listen(PORT, function (){
    console.log("Server is running on Port: " + PORT); 
})