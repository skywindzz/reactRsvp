import React, { Component } from 'react';
import './App.css';
import GuestList from './GuestList';

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
    return (
      <div className="App">
      <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <form onSubmit={this.submitNewGuest}>
            <input 
              type="text" 
              onChange={this.handleNameInput} 
              value={this.state.pendingGuest} 
              placeholder="Invite Someone" />
            <button type="submit" name="submit" value="submit">Submit</button>
        </form>
      </header>
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
        <table className="counter">
          <tbody>
            <tr>
              <td>Attending:</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Unconfirmed:</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Total:</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        { /* to make HTML comment in react you need to first do in javascript's comment format
        and you also need to put it inside a bracket */ }
        { /* so in react parent pass objects down to it's child example here is 
        Guestlist in app.js pass down two piece of object down to Guestlist.js */ }

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
