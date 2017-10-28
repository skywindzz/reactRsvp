import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestListComponent/GuestList';
import Counter from './Counter';
import Header from './Header';

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
      <div className="main">
        <div>
          <h2>Invitees</h2>
          <label>
            <input 
              type="checkbox" 
              onChange={this.toggleFilter} 
              checked={this.state.isFiltered} /> Hide those who haven't responded
          </label>
        </div>
        
        { /* to make HTML comment in react you need to first do in javascript's comment format
        and you also need to put it inside a bracket */ }
        { /* so in react parent pass objects down to it's child example here is 
        Guestlist in app.js pass down two piece of object down to Guestlist.js */ }
        
        <Counter 
          totalInvited={totalInvited}
          numberAttending={numberAttending} 
          numberUncomfirmed={numberUncomfirmed}
          />
        { /*Beware if variable is decleared inside the render you can't this this.totalInvited */ }

        <GuestList 
          guests = {this.state.guests} 
          toggleConfirmationAt = {this.toggleConfirmationAt}
          toggleEditingAt = {this.toggleEditingAt} 
          setNameAt = {this.setNameAt} 
          removeElementAt= {this.handleRemoval}
          isFiltered = {this.state.isFiltered} 
          pendingGuest={this.state.pendingGuest} />
          </div>    
    </div>
    );
  }
}

export default App;
