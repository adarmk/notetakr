import React, { Component } from 'react'; 

export default class NoteItem extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            active: false,
            id: this.props.id
        }

        this._onClick = this._onClick.bind(this);
        this._onBlur = this._onBlur.bind(this);
    }


    _onClick () {
        this.setState({active : true});
    }

    _onBlur () {
        this.setState({active : false});
    }

    render () {
        return   (
            <div tabIndex={0} onClick={this._onClick} onBlur={this._onBlur} className={this.state.active ? "note-item-active" : "note-item"}>
                <h3 className="note-title-sidebar">{this.props.note_title}</h3>
                <p className="note-preview">{this.props.note_preview}</p>
            </div>
        )
    }
}