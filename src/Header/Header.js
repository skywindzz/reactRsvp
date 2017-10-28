import React from 'react';
import PropTypes from 'prop-types';

import GuestInputForm from './GuestInputForm';

{ /* remember to pass in props in the function!! */}

const Header = props => 
    <header>
        <h1>RSVP</h1>
        <p>A Treehouse App</p>
        <GuestInputForm
            submitNewGuest= {props.submitNewGuest}
            handleNameInput= {props.handleNameInput}
            pendingGuest= {props.pendingGuest}
        />
    </header>

Header.propTypes = {
    submitNewGuest: PropTypes.func.isRequired,
    handleNameInput: PropTypes.func.isRequired,
    pendingGuest: PropTypes.string.isRequired
}    
export default Header;