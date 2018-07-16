import React, { Component } from 'react';
import './index.css';
import firebase from 'firebase';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
     //meter los campos
     email: '',
     password: '',
     emailError: false,
     loginError: ''
    }
    this.db = firebase.auth();
    //hacer los bind
    this.login = this.login.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
   
  }

  //set states en las funciones

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
    //createUserWithEmailAndPassword
  }

  onChangeEmail(event){
    this.setState({email: event.target.value})
}

onChangePassword(event){
    this.setState({password: event.target.value})
}

login(e){
      e.preventDefault();
      let error = false;

      if(this.state.email == ''){
          this.setState({emailError: true});
          error = true;
      }

      if(this.state.password == ''){
          this.setState({passwordError: true});
          error = true;
      }
      

      if(!error){

        this.db.signInWithEmailAndPassword(this.state.email, this.state.password).then((result)=>{
            console.log(this.db.currentUser.uid)
            this.props.history.push(`/my-mood/${this.db.currentUser.uid}`)
            console.log('ok logeado')},(error)=> {
            //var user = this.db.currentUser;
            //console.log(user)
            
            
            // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(errorMessage)
      });
    }
  }

  render() {
    const {emailError, loginError} = this.state;

    //Hacer un form y enviar datos a firebase
    return (
      <div>
        <p className='titleLogin'>Login</p>
        <div className="login-form">
                <form onSubmit={this.login}> 
                    <div className="form-item">
                        <div className="form-item-label">Email: </div>
                        <input 
                            type="email" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                        />
                        {emailError && <span className="form-error"><br/>Campo obligatorio</span>}
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Password: </div>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div>
                        {loginError && <span>{loginError}</span>}
                    </div>
                    <div className="form-item">
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
      </div>
    );
  }
}

export default Login;
