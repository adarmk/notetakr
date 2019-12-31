import React, { Component } from 'react'; 

export default class NotePage extends Component {
    render () {
        return   (
            <div className="note-page">
                <p className="date">{this.props.date_modified}</p>
                <h1 contentEditable="true" className="note-title">{this.props.note_title}</h1>
                <div contentEditable="true" className="note-text">
                    {this.props.note_body}
                </div>
                
            </div>
        )
    }
}