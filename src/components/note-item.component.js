import React, { Component } from 'react'; 
import '../App.js';
//import Consumer from '../context'; 

export default class NoteItem extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            active: false,
            id: this.props.note_id
        }

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _onFocus () {
        this.setState({active : true}, () => this.props.updateNote(this.state.id)); 
        console.log(`Focused on: ${this.state.id}`);
    }

    _onBlur () {
            this.setState({active : false});
    }
    
    render () {
        return   (
            <div    
                    id={this.state.id}
                    tabIndex={0}
                    onFocus={this._onFocus} 
                    onBlur={this._onBlur} 
                    className={this.state.active ? "note-item-active" : "note-item"}
            >
                <h3 className="note-title-sidebar">{this.props.note_title}</h3>
                <p className="note-preview">{this.props.note_preview}</p>
            </div>
        )
    }
}