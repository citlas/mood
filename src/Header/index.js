import React from 'react'
import {Link} from 'react-router-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const Header = function(props){
    
    return (
        <header>
            <Link to="/">Home</Link>
            {!props.user && <Link to="/signup">Register</Link>}
            {!props.user && <Link to="/login">Login</Link>}
            {props.user && <Link to="/update-profile/:user">Update profile</Link>}
            {props.user && <Link to="/my-mood/:user">My mood</Link>}
            {/*props.user && (<span><span>{props.user.email}</span> - <span onClick={props.onLogout}>Logout</span></span>)*/}
            {props.user && <Link onClick={props.onLogout} to="/">Logout</Link>}
            <div><FontAwesomeIcon className="icon" icon="bars" id="fa"/></div>
           

            {props.user && (<span><span>{props.user.email}</span> </span>)}
        </header>
    );
}
export default Header;