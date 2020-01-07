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

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }

    _onFocus () {
        this.setState({active : true}, () => this.props.renderCurrentNote(this.state.id)); 
    }

    _onBlur () {
        this.setState({active : false});
    }
    
    _returnShortened (limit, str) {
        if (str.length===0) {return <br/>}

        let sliceTo;
            if (str.length < limit) {
                sliceTo = str.length;
            } else {
                sliceTo = limit; 
            }

            return str.slice(0, sliceTo) + (sliceTo === limit ? "..." : '')
    }

    render () {
        return   (
            <Consumer>
                {(context) => (
                    <div    
                        id={this.state.id}
                        tabIndex={0}
                        onFocus={this._onFocus} 
                        onBlur={this._onBlur}
                        className={this.state.active ? "note-item-active" : "note-item"}
                    >
                        <h3 className="note-title-sidebar">{this.state.active ? context.state.currentNoteTitle : this.props.note_title}</h3>
                        <p className="note-preview">{this._returnShortened(52, (this.state.active ? context.state.currentNoteBody : this.props.note_preview))}</p>
                    </div>
                )}
            </Consumer>
        )
    }
}