import React, {Component, createContext} from "react"; 
import axios from 'axios';

//Context for sharing data between components
const {Provider, Consumer} = createContext(); 

//Provider
class Context extends Component {
  state = {
    currentNoteId: '',
    currentNoteDate: '',
    currentNoteTitle: '',
    currentNoteBody: ''
  };

  renderCurrentNote = (id) => {
    this.setState({currentNoteId: id}, () => {
        axios.get('http://localhost:4000/notes/'+id)
      .then(response => {
        this.setState({
          currentNoteDate: response.data.date_modified, 
          currentNoteTitle: response.data.note_title, 
          currentNoteBody: response.data.note_body
        });
      })
      .catch(function(error) {
        console.log(error);
      })
    }); 
  }

  updateState = (date, title, body) => {
    this.setState({
      currentNoteDate: date, 
      currentNoteTitle: title, 
      currentNoteBody: body
    })
  }

  render(){
    return(
      <Provider value={{
        state: this.state, //Giving components access to global state
        renderCurrentNote: this.renderCurrentNote, //Allows components to update ID
        updateContextState: this.updateState
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {Context}; 

export default Consumer; 