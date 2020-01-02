import React, { Component } from 'react'; 
import NoteItem from './note-item.component';
import Consumer from '../context';

//import { Link } from 'react-router-dom';
import axios from 'axios'; 

export default class Sidebar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            notes: [],  
            currentNoteId: ''   
        }; 

        this.createNote = this.createNote.bind(this);
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
            return <NoteItem updateNote={updateNote} note_id={currentNote._id} note_title={currentNote.note_title} note_preview={currentNote.note_body.slice(0, sliceTo) + (sliceTo === 52 ? "..." : '')} key={i}/>;
        })
    }

    createNote () {
        axios.post('http://localhost:4000/notes/add').then(res => {
            console.log(res.data)
            let temp = this.state.notes; 
            temp.push(res.data); 
            this.setState({notes: temp}, () => document.getElementById(res.data._id).focus()); 
        });  
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