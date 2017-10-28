import React, { Component } from 'react';
import './App.css';
import MainComponent from './MainComponent/MainComponent';
import Header from './Header/Header';

class App extends Component {

  state = {

    isFiltered : false,
    pendingGuest: '',
    guests : [
      {
        name: 'Anthony',
        isConfirmed: false,
        isEditing: false
      },
      {
        name : 'eric',
        isConfirmed: true,
        isEditing: false
      },
      {
        name: 'olive',
        isConfirmed: true,
        isEditing: true
      }
    ]
  }
  
  handleNameInput = e => {
    this.setState({
      pendingGuest: e.target.value
    })
  }

  submitNewGuest= e => {
    e.preventDefault();
    this.setState({
      guests: [
        {
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



  toggleGuestPropertyAt = (property, indexToChange) => 
    this.setState({
      guests: this.state.guests.map((guest,index) => {
        if(index === indexToChange) {
          return{
            ...guest,
            [property]: !guest[property]
          };
        }
        return guest;
      })
    });

  toggleConfirmationAt = index =>   
    this.toggleGuestPropertyAt('isConfirmed', index);
  
  toggleEditingAt = index =>
    this.toggleGuestPropertyAt('isEditing', index);
 
    setNameAt = (name, indexToChange) => 
      this.setState({
      guests: this.state.guests.map((guest,index) => {
        if(index === indexToChange) {
          return{
            ...guest,
            name
          };
        }
        return guest;
      })
    });

    handleRemoval= index => { 
      this.setState({
        guests: this.state.guests.splice(index, 1) && this.state.guests
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
