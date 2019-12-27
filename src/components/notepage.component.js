import React, { Component } from 'react'; 

export default class Sidebar extends Component {
    render () {
        return   (
            <div className="note-page">
                <p className="date">December 25, 2019</p>
                <h1 contenteditable="true" className="note-title">Hello</h1>
                <p contenteditable="true" className="note-text">Hello friends</p>
            </div>
        )
    }
}