import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import './App.css';
import Sidebar from "./components/sidebar.component"; 
import Notepage from "./components/notepage.component"; 

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      hello: "hello"
    }
  }
  render () {
    return (
      <Router>
          <Sidebar/>
          <Notepage /*date_modified={currentNote.date_modified} note_title={currentNote.note_title} note_body={currentNote.note_body}*//>
      </Router>
    )
  }
}
export default App;
