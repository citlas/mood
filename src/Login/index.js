import React, { Component } from 'react';
import './index.css';
//importar firebase

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
    //hacer los bind
  }

  //set states en las funciones

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
    //createUserWithEmailAndPassword
  }

  render() {
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
                            onChange='cambiar por la funcion'
                        />
                        {/*emailError && <span className="form-error">Campo obligatorio</span>*/}
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Password: </div>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            onChange='cambiar por la funcion'
                        />
                    </div>
                    <div>
                        {/*loginError && <span>{loginError}</span>*/}
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
