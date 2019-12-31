import React, { Component } from 'react'; 
import NoteItem from './note-item.component';
//import { Link } from 'react-router-dom';
import axios from 'axios'; 

/*const NoteItem = props => (
    <div onClick={this.setState({active: true})} className={this.state.active ? "note-item-active" : "note-item"}>
        <h3 className="note-title-sidebar">{props.note_title}</h3>
        <p className="note-preview">{props.note_body}</p>
    </div>
)*/

export default class Sidebar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            notes: [],     
        }; 
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

    noteList () { //Displays all notes in the sidebar
        
        return this.state.notes.map(function(currentNote, i){
            //Limiting the note preview length to 52 characters
            let sliceTo;
            if (currentNote.note_body.length < 52) {
                sliceTo = currentNote.note_body.length;
            } else {
                sliceTo = 52; 
            }
            return <NoteItem note_id={currentNote.id} note_title={currentNote.note_title} note_preview={currentNote.note_body.slice(0, sliceTo) + (sliceTo === 52 ? "..." : '')} key={i}/>;
        })
    }


    //User interaction methods
    selectNote () {
        
    }

    render () {
        return   (
            <div className="sidebar">
                <h1 className="app-title">NoteTakr</h1>
                <h2 className="text-button">Log out</h2>
                <h2 className="text-button">New note</h2>
                <div className="item-scroll">
                    { this.noteList() }
                </div>
            </div>
        
        )
    }
}