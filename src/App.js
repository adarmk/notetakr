import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios'; 
import './App.css';
import Sidebar from "./components/sidebar.component"; 
import Notepage from "./components/notepage.component"; 
import Consumer, {Context} from './context'; 

class App extends Component {
  /*constructor(props) {
    super(props); 
    /*this.getCurrentNoteId = this.getCurrentNoteId.bind(this);
  }*/

  /*getCurrentNoteId = (idFrmChild) => {
      this.setState({currentNoteId: idFrmChild});
      this.getNote();
  }*/

  render () {
    return (
      <Context>
        <Router>
            <Sidebar /*parentCallback={this.getCurrentNoteId}*//>
            <Consumer>
              {(context) => (
                <Notepage date_modified={context.state.currentNoteDate} 
                note_title={context.state.currentNoteTitle} 
                note_body={context.state.currentNoteBody}/>
              )}
            </Consumer>
        </Router>
      </Context>
    )
  }
}
export default App;
