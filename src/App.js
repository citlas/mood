import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import './App.css';
//importar todas los componentes
import Home from './Home';
import Register from './Register';
import Login from './Login';
import UserMood from './UserMood';
import MyMood from './MyMood';
import AddToday from './AddToday';
import UpdateProfile from './UpdateProfile';
import Header from './Header';
import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faBars)
library.add(faStroopwafel)

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: null
    }

    this.logout = this.logout.bind(this);
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user: ', user);
        const myUser = {
          email: user.email,
          id: user.uid
        }

        this.setState({user : myUser});
      } else {
        console.log("Bye bye");
      }
    });
  }

  logout(){
    firebase.auth().signOut().then(() => {
      this.setState({user: null});
    }, (error) => {
      console.log("ERROR logout");
    });
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <div className="App">
        <Header  user={user}  onLogout={this.logout}/>

          <h1>Mood of the world </h1>
           
          
        
          <Switch>
            
            <Route path="/" exact component={Home}/>
            <Route path="/signup" component={Register}/>
            <Route path="/login" component={Login} />
            <Route path="/user-mood/:user" component={UserMood} />{/*va a poner match params user en userMood*/}
            <Route path="/my-mood/" render={(props)=><MyMood user={user}/>} />
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
