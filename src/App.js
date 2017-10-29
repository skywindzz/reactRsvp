import React, { Component } from 'react';
import './App.css';
import MainComponent from './MainComponent';  
import Header from './Header';

{/* in any folder index.js is autoload so you just need to load the parent component to index.js  */}

class App extends Component {

  state = {

    isFiltered : false,
    pendingGuest: '',
    guests : []
  }
  
  handleNameInput = e => {
    this.setState({
      pendingGuest: e.target.value
    })
  }

  lastGuestId = 0;

  assignGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId +=1;
    return id;
  } 

  submitNewGuest= e => {
    e.preventDefault();
    const id = this.assignGuestId();
    this.setState({
      guests: [
        {
         id,
         name: this.state.pendingGuest,
         isConfirmed: false,
         isEditing: false
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    });
  } 

  getTotalInvited = () => this.state.guests.length;

  getAttending = () => this.state.guests.reduce(
    (total,guest) => guest.isConfirmed ? total + 1 : total,
    0
  );



  toggleGuestPropertyAt = (property, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if(id === guest.id) {
          return{
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = id =>   
    this.toggleGuestPropertyAt('isConfirmed', id);
  
  toggleEditingAt = id =>
    this.toggleGuestPropertyAt('isEditing', id);
 
    setNameAt = (name, id) => 
      this.setState({
      guests: this.state.guests.map(guest => {
        if(id === guest.id) {
          return{
            ...guest,
            name
          };
        }
        return guest;
      })
    });

    handleRemoval= id => { 
      this.setState({
        guests: this.state.guests.filter(guest => id !== guest.id ) 
    });
    }
   
    toggleFilter = () => {
      this.setState ({
        isFiltered: !this.state.isFiltered
      });
    }

  render() {
    { /* you put totaledInvited inside render because you want it to update everytime you reender and data update */ }
    const totalInvited = this.getTotalInvited();
    const numberAttending  = this.getAttending();
    const numberUncomfirmed = totalInvited - numberAttending;
    
    return (
      <div className="App">
        <Header 
          submitNewGuest={this.submitNewGuest}
          handleNameInput={this.handleNameInput}
          pendingGuest={this.state.pendingGuest}
        />
      
        <MainComponent
          toggleFilter= {this.toggleFilter}
          isFiltered= {this.state.isFiltered}
          totalInvited= {totalInvited}
          numberAttending= {numberAttending}
          numberUncomfirmed= {numberUncomfirmed}
          guests= {this.state.guests}
          toggleConfirmationAt= {this.toggleConfirmationAt}
          toggleEditingAt= {this.toggleEditingAt}
          setNameAt= {this.setNameAt}
          removeElementAt= {this.handleRemoval}
          pendingGuest= {this.state.pendingGuest}
        />  
      </div>
    );
  }
}

export default App;
