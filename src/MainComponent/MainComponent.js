import React from 'react';
import PropTypes from 'prop-types';

import ConfirmFilter from './ConfirmFilter';
import Counter from './Counter';
import GuestList from './GuestList';


const MainComponent = props => 
    <div className="main">
        <ConfirmFilter
            toggleFilter = {props.toggleFilter}
            isFiltered = {props.isFiltered} />

    { /* to make HTML comment in react you need to first do in javascript's comment format
    and you also need to put it inside a bracket */ }
    { /* so in react parent pass objects down to it's child example here is 
    Guestlist in app.js pass down two piece of object down to Guestlist.js */ }

        <Counter 
            totalInvited={props.totalInvited}
            numberAttending={props.numberAttending} 
            numberUncomfirmed={props.numberUncomfirmed} />
    { /*Beware if variable is decleared inside the render you can't this this.totalInvited */ }

        <GuestList 
            guests = {props.guests} 
            toggleConfirmationAt = {props.toggleConfirmationAt}
            toggleEditingAt = {props.toggleEditingAt} 
            setNameAt = {props.setNameAt} 
            removeElementAt= {props.removeElementAt}
            isFiltered = {props.isFiltered} 
            pendingGuest={props.pendingGuest} />   
    </div>
    
MainComponent.propTypes = {
    toggleFilter: PropTypes.func.isRequired,
    totalInvited: PropTypes.number,
    numberAttending: PropTypes.number,
    numberUncomfirmed: PropTypes.number,
    guests: PropTypes.array.isRequired,
    toggleConfirmationAt: PropTypes.func.isRequired,
    toggleEditingAt: PropTypes.func.isRequired,
    setNameAt: PropTypes.func.isRequired,
    isFiltered: PropTypes.bool.isRequired,
    pendingGuest: PropTypes.string
}    

export default MainComponent;
