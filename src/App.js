import React, { Component } from 'react';
//import {BrowserRouter as Router, Route, Link} from "react-router-dom";
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
        <Sidebar /*parentCallback={this.getCurrentNoteId}*//>
        <Consumer>
          {(context) => (
            <Notepage   
                        note_id={context.state.currentNoteId}
                        date_modified={context.state.currentNoteDate} 
                        note_title={context.state.currentNoteTitle} 
                        note_body={context.state.currentNoteBody}
                        updateContextState={context.updateContextState}


            />
          )}
        </Consumer>
      </Context>
    )
  }
}
export default App;
