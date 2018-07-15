import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import firebase from 'firebase';
import './App.css';
//importar todas los componentes
import Home from './Home';
import Register from './Register';
import Login from './Login';
import MyMood from './MyMood';
import AddToday from './AddToday';
import UpdateProfile from './UpdateProfile';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        {/*<Header user={user} onLogout={this.logout}/>*/}
          <h1>Mood of the world </h1>
           
          
        
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/signup" component={Register}/>
            <Route path="/login" component={Login} />
            <Route path="/my-mood/:user" component={MyMood} />
            <Route path="/add-today/:user" component={AddToday}/>
            <Route path="/update-profile/:user" component={UpdateProfile}/>
            <Route path="*" component={Home}/>


          </Switch>
          <footer>
            <p>this is my footer</p>
          </footer>
        </div>
      </Router>
      
    );
  }
}

export default App;
