import React, { Component } from 'react'; 
import NoteItem from './note-item.component';
import Consumer from '../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faTrash } from '@fortawesome/free-solid-svg-icons'; 
import axios from 'axios'; 

export default class Sidebar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            notes: []  
        }; 

        this.createNote = this.createNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this); 
    }

    componentDidMount() { //Gets all notes from db in JSON format
        axios.get('http://localhost:4000/notes/')
            .then(response => {
                this.setState({notes: response.data})
            })
            .catch(function(error){
                console.log(error);
            })
    }

    noteList (updateNote) { //Displays all notes in the sidebar
        return this.state.notes.map((currentNote, i) => {
            //Limiting the note preview length to 52 characters
            let sliceTo;
            if (currentNote.note_body.length < 52) {
                sliceTo = currentNote.note_body.length;
            } else {
                sliceTo = 52; 
            }
            console.log(currentNote._id);
            return <NoteItem    updateNote={updateNote} 
                                key={currentNote._id}
                                note_id={currentNote._id} 
                                note_title={currentNote.note_title} 
                                note_preview={currentNote.note_body.slice(0, sliceTo) + (sliceTo === 52 ? "..." : '')} 
                    />;
        })
    }

    createNote () {
        axios.post('http://localhost:4000/notes/add').then(res => { //Adds note to database
            console.log(res.data)

            let temp = this.state.notes; //Creates temporary variable to hold notes array
            temp.push(res.data);  //Appends the new note to said array
            this.setState({notes: temp}, () => document.getElementById(res.data._id).focus()); //Updates notes array w/ new array in state
        });  
    }

    deleteNote (id) {
        if (this.state.notes.length > 0) {
            console.log(id)
            axios.delete('http://localhost:4000/notes/delete/'+id).then(res => { //Delete notes
                console.log(res.data);
                //Creates a filtered version of this.state.notes without the note that was just deleted from the database
                let temp = this.state.notes.filter(function(note){ 
                    return note._id !== id;
                }); 

                //Updates this.state.notes and focuses on first element as long as there is at least one element
                    this.setState({notes: temp}, ()=> {
                        if (this.state.notes.length > 0) {
                            document.getElementById(this.state.notes[0]._id).focus()
                        }
                    }); 
            });
        }
    }

    render () {
        return   (
            <Consumer>
                {(context) => (
                    <React.Fragment>
                        <div className="sidebar">
                            <h1 className="app-title">NoteTakr</h1>
                            <button className="text-button">Log out</button>
                            <button className="text-button" onClick={this.createNote}>New note</button>

                            <button     className="trash-btn"
                                        onClick={()=>this.deleteNote(context.state.currentNoteId)}
                            >
                                <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                            </button>

                            <div className="item-scroll">
                                { this.noteList(context.updateNote) }
                            </div>
                         </div>
                    </React.Fragment>
                )}
            </Consumer>
        )
    }
}