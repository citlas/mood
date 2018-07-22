import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';


class UpdateProfile extends Component {
  constructor(props){
    super(props);

    this.state = {
     
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
       this.update = this.update.bind(this);
       this.selectCountry = this.selectCountry.bind(this);
       this.selectSex = this.selectSex.bind(this);
       this.selectAge = this.selectAge.bind(this);
       this.selectPublic = this.selectPublic.bind(this);
       this.onChangeEmail = this.onChangeEmail.bind(this);
       this.onChangePassword = this.onChangePassword.bind(this);
       //this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
   
       this.userv = firebase.auth().currentUser
   }

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
    
  }


  update(e){
    e.preventDefault();

    var user = firebase.auth().currentUser;
    //console.log(firebase.auth().currentUser.email)
    //console.log('updating')
 
    if(this.state.email==''){
        this.setState({email: firebase.auth().currentUser.email})
    }
    //update email in auth OK!!!
    user.updateEmail(this.state.email).then(function() {
        console.log('se guardo',this.state.email)
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });

      //update contrasea en auth OK!!!!
      var newPassword = this.state.password;
      user.updatePassword(newPassword).then(function() {
        // Update successful.
        console.log('se guardo',newPassword)
        }).catch(function(error) {
        // An error happened.
        console.log(error)
        });

     //update en data de age, country, email, password, public, sex, uid
     
     firebase.firestore().collection('Users')
     .where("uid","==",this.props.user.id)
     .get()
     .then((querySnapshot)=> {
      
       firebase.firestore().collection("Users").doc(querySnapshot.docs['0'].id).set({
         age:this.state.age,
         country:this.state.country,
         email:this.state.email,
         password:this.state.password,
         public:this.state.public,
         sex:this.state.sex,

       }, { merge: true })
       .then(function() {
           console.log("Document successfully written!");
           { alert('Datos actualizados ;)'); }
         })
       .catch(function(error) {
           console.error("Error writing document: ", error);
       });
        
     })
     .catch(function(error) {
         console.log("Error getting documents: ", error);
     });
  
  
}

onChangeEmail(event){
  this.setState({email: event.target.value})
  }

  onChangePassword(event){
      this.setState({password: event.target.value})
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
    //cambiar mail, pais, sexo, password, edad, publico o privado
    //boton update
    

    
    return (
        <div>
        <p className="titleUpdate">Update your profile</p>
        <div className="update-form">
                <form onSubmit={this.update}> 
                    <div className="form-item">
                        <div className="form-item-label">Email: </div>
                        <input 
                            type="email" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                            autoComplete="email"
                        />
                        {/*emailError && <span className="form-error">Campo obligatorio</span>*/}
                    </div>
                    <div className="form-item">
                        <div className="form-item-label">Password: </div>
                        <input 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            autoComplete="new-password"
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
                        <button id="signButton" type="submit">Update!!</button>
                    </div>
                </form>
            </div>
      </div>
      
    );
  }
}

export default UpdateProfile;
