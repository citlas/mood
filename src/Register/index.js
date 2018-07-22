import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';
//import Countries from '../services/Countries';


class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
     //meter los campos
     email: '',
     password: '',
     passwordConfirm:'',
     country:'',
     sex:'',
     age:'',
     public: false,
     emailError: false,
     passwordError: false,
     value: '',
     uid: ''
    }

    this.db = firebase.auth();
    //hacer los bind
    this.register = this.register.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectSex = this.selectSex.bind(this);
    this.selectAge = this.selectAge.bind(this);
    this.selectPublic = this.selectPublic.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);

}

  //set states en las funciones

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
    //createUserWithEmailAndPassword
  }

  register(e){
      e.preventDefault();
      let error = false;

      if(this.state.email === ''){
          this.setState({emailError: true});
          error = true;
      }

      if(this.state.password === ''){
          this.setState({passwordError: true});
          error = true;
      }
      

      if(!error){

        this.db.createUserWithEmailAndPassword(this.state.email, this.state.password).then((result)=>{
            firebase.firestore().collection('Users').add({
                email: this.state.email,
                password: this.state.password,
                country:this.state.country,
                sex:this.state.sex,
                age:this.state.age,
                public: this.state.public,
                uid:  this.db.currentUser.uid
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
           
            this.props.history.push(`/my-mood/${this.db.currentUser.uid}`)
        },(error)=> {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }
  }

  onChangeEmail(event){
    this.setState({email: event.target.value})
    }

    onChangePassword(event){
        this.setState({password: event.target.value})
    }
    onChangePasswordConfirm(event){
        this.setState({passwordConfirm: event.target.value})
    } 
  selectCountry(e){
    this.setState({country: e.target.value});
    }
    
    selectSex(e){
    this.setState({sex: e.target.value});
    }
    selectAge(e){
        this.setState({age: e.target.value});
    }
    selectPublic(e){
        this.setState({public: e.target.value});
    }

   
    
  render() {
    //Hacer un form y enviar datos a firebase
    return (
      <div>
        <p className="titleRegister">Register</p>
        <div className="register-form">
                <form onSubmit={this.register}> 
                    <div className="form-item">
                        <div className="form-item-label">Email: </div>
                        <input 
                            type="email" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                        />
                        {/*emailError && <span className="form-error">Campo obligatorio</span>*/}
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Password: </div>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Confirm password: </div>
                        <input 
                            type="password" 
                            value={this.state.passwordConfirm} 
                            onChange={this.onChangePasswordConfirm}
                        />
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Country: </div>
                        <select onChange={this.selectCountry}>
                            <option value="choose">Choose one</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Spain">Spain</option>
                            <option value="Venezuela">Venezuela</option>
                        </select>
                        </div>

                    <div className="form-item">
                        <div className="form-item-label">Sex: </div>
                        <select onChange={this.selectSex}>
                          <option value="choose">Choose one</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Age: </div>
                        <select onChange={this.selectAge}>
                        <option value="choose">Choose one</option>
                          <option value="<18">Less than 18</option>
                          <option value="19-25">19-25</option>
                          <option value="26-40">26-40</option>
                          <option value="40-60">40-60</option>
                          <option value="60-80">60-80</option>
                          <option value=">80">>80</option>
                        </select>
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Make it public? </div>
                        <select onChange={this.selectPublic}>
                        <option value="choose">Choose one</option>
                          <option value="true">Yes, share my moods!</option>
                          <option value="false">No, it is only for me!</option>
                        </select>
                    </div>
                    
                    <div className="form-item">
                        <button type="submit">Signup!!</button>
                    </div>
                </form>
            </div>
      </div>
    );
  }
}

export default Register;
