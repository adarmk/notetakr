import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"
import './App.css';
import Sidebar from "./components/sidebar.component"; 
import Notepage from "./components/notepage.component"; 

class App extends Component {
  render () {
    return (
      <Router>
          <Sidebar/>
          <Notepage/>
      </Router>
    )
  }
}
export default App;
