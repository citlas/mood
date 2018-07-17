import React, { Component } from 'react'
import {Link} from 'react-router-dom';

const Header = function(props){
    return (
        <header>
            <Link to="/">Home</Link>
            {!props.user && <Link to="/signup">Register</Link>}
            {!props.user && <Link to="/login">Login</Link>}
            <Link to="/update-profile/:user">Update profile</Link>
            <Link to="/my-mood/:user">My mood</Link>
            
           

            {props.user && (<span><span>{props.user.email}</span> - <span onClick={props.onLogout}>Logout</span></span>)}
        </header>
    );
}
export default Header;