import React, { Component } from 'react'; 
import '../App.js';
import Consumer from '../context'; 

export default class NoteItem extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            active: false,
            id: this.props.note_id
        }

        this._onClick = this._onClick.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    /*sendNoteId = () => {
        this.props.parentCallback(this.state.id);
    }*/

    _onClick () {
        this.setState({active : true}, () => this.props.updateNote(this.state.id)); 
    }

    _onBlur () {
        this.setState({active : false});
    }

    render () {
        return   (
        <Consumer>
            {(context) => (
                <React.Fragment>
                    <div    tabIndex={this.props.tabIndex} 
                            onClick={this._onClick} 
                            onBlur={this._onBlur} 
                            className={this.state.active ? "note-item-active" : "note-item"}
                    >
                        <h3 className="note-title-sidebar">{this.props.note_title}</h3>
                        <p className="note-preview">{this.props.note_preview}</p>
                    </div>
                </React.Fragment>
            )}
            
        </Consumer>
        
        )
    }
}