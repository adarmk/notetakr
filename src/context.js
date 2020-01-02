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

  updateNote = (id) => {
    this.setState({currentNoteId: id}, () => {
        axios.get('http://localhost:4000/notes/'+this.state.currentNoteId)
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

  render(){
    return(
      <Provider value={{
        state: this.state, //Giving components access to global state
        updateNote: this.updateNote //Allows components to update ID
      }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {Context}; 

export default Consumer; 