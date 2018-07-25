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
        uid: '',
        showEmail: true,
        showPassword: true,
        showCountry: true,
        showAge: true,
        showPublic: true,
        showSex: true

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
       this.changeEmail = this.changeEmail.bind(this);
       this.changePassword = this.changePassword.bind(this);
       this.changeCountry = this.changeCountry.bind(this);
       this.changeAge = this.changeAge.bind(this);
       this.changePublic = this.changePublic.bind(this);
       this.changeSex = this.changeSex.bind(this);
       //this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
   
       this.userv = firebase.auth().currentUser
   }

  componentDidUpdate(prevProps, prevState) {
   // console.log("componentDidUpdate START");
   // console.log('prev ',prevProps.user, 'this ',this.props.user)
    //llamar a firebase
    //siempre tiene que tener if por que si no siempre va a llamarse

    if(this.props.user && !prevProps.user){
        firebase.firestore().collection('Users')
        .doc(this.props.user.id)
        .get()
        .then((doc)=> {
            const newState = Object.assign(this.state, doc.data()); 
            console.log('busca newstate',newState)

         this.setState(newState)
         //this.setState({age: age}) 
         //this.setState({country: country}) 
         //this.setState({email: email}) 
         //this.setState({password: password}) 
         //this.setState({public: public}) 
         //this.setState({sex: sex})  
         //console.log('age',age)
          })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
    /*
    */
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
/*
        if(this.state.country==''){
            this.setState({country: firebase.auth().currentUser.email})
        }
        if(this.state.sex==''){
            this.setState({sex: firebase.auth().currentUser.email})
        }
        if(this.state.age==''){
            this.setState({age: firebase.auth().currentUser.email})
        }
        if(this.state.public==''){
            this.setState({public: firebase.auth().currentUser.email})
        }*/

     //update en data de age, country, email, password, public, sex, uid
     
     firebase.firestore().collection("Users").doc(this.props.user.id).set({
        age:this.state.age,
        country:this.state.country,
        email:this.state.email,
        public:this.state.public,
        sex:this.state.sex,
        uid:this.props.user.id

      })
      .then(function() {
          console.log("Document successfully written!");
          { alert('Datos actualizados ;)'); }
          //this.history.push(`/my-mood/${this.db.currentUser.uid}`)

        })
      .catch(function(error) {
          console.error("Error writing document: ", error);
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

  changeEmail(){
    this.setState({showEmail: true});
    console.log(this.state.showEmail)
  }
  changePassword(){
    this.setState({showPassword: true});
    console.log(this.state.showPassword)
  }
  changeCountry(){
    this.setState({showCountry: true});
    console.log(this.state.showCountry)
  }
  changeAge(){
    this.setState({showAge: true});
    console.log(this.state.showAge)
  }
  changePublic(){
    this.setState({showPublic: true});
    console.log(this.state.showPublic)
  }
  changeSex(){
    this.setState({showSex: true});
    console.log(this.state.showSex)
  }
  render() {
    //cambiar mail, pais, sexo, password, edad, publico o privado
    //boton update
    
    console.log('esto es user props',this.props.user)

    
    return (
        <div>
        <p className="titleUpdate">Update your profile</p>
        <div className="update-form">
                <form onSubmit={this.update}> 
                    <div className="form-item">
                        <div className="form-item-label" onClick={this.changeEmail}>Click HERE to change Email: 
                        </div>
                        {this.state.showEmail ? <input 
                            type="email" 
                            value={this.state.email} 
                            onChange={this.onChangeEmail}
                            autoComplete="email"
                        /> : ''}
                        
                        {/*emailError && <span className="form-error">Campo obligatorio</span>*/}
                    </div>
                    <div className="form-item">
                        <div className="form-item-label" onClick={this.changePassword}>Click to change Password: </div>
                        {this.state.showPassword ? <input 
                            type="password" 
                            value={this.state.password} 
                            onChange={this.onChangePassword}
                            autoComplete="new-password"
                        /> : ''}
                        
                        
                    </div>
                 
                    <div className="form-item">
                    <div className="form-item-label" onClick={this.changeCountry}>Click to change Country: </div>
                    {this.state.showCountry ? <select value={this.state.country}  onChange={this.selectCountry}>
                            <option value="choose">Choose one</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Spain">Spain</option>  
                            <option value="Venezuela">Venezuela</option>
                        </select>
                     : ''}

                        
                        </div>
                    <div className="form-item">
                        <div className="form-item-label" onClick={this.changeSex}>Click to change Sex: </div>
                        {this.state.showSex ? <select value={this.state.sex}  onChange={this.selectSex}>
                          <option value="choose">Choose one</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                     : ''}
                        
                        
                    </div>
                    <div className="form-item">
                        <div className="form-item-label" onClick={this.changeAge}>Click to change Age: </div>
                        {this.state.showAge ? 
                        <select value={this.state.age} onChange={this.selectAge}>
                        <option value="choose">Choose one</option>
                        <option value="<18">Less than 18</option>
                        <option value="19-25">19-25</option>
                        <option value="26-40">26-40</option>
                        <option value="40-60">40-60</option>
                        <option value="60-80">60-80</option>
                        <option value=">80">>80</option>
                      </select>
                     : ''}

                        
                    </div>
                    <div className="form-item">
                        <div className="form-item-label" onClick={this.changePublic}>Click to change Make it public? </div>
                        {this.state.showPublic ? 
                         <select value={this.state.public} onChange={this.selectPublic}>
                         <option value="choose">Choose one</option>
                           <option value="true">Yes, share my moods!</option>
                           <option value="false">No, it is only for me!</option>
                         </select>
                     : ''}
                       
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
