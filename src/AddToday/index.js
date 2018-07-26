import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';
import CalendarService from '../services/CalendarService'


class AddToday extends Component {
  constructor(props){
    super(props);

    this.state = {
      valueTextarea: '',
      oneYearNotas: {}
    }
    this.addMood = this.addMood.bind(this);
    //this.getNumberByColor = this.getNumberByColor.bind(this);
    this.sendMood = this.sendMood.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
    this.checkDataUserInDate = this.checkDataUserInDate.bind(this);
  }

  checkDataUserInDate(){
    
  }

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
    const today = new Date()

    firebase.firestore().collection('date').where("userId","==",this.props.userId)
    .where("date","==",today.toLocaleDateString())
    .get()
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
      //para meter las notas anteriores
        querySnapshot.forEach((doc)=> {
            let noteToShow = `${doc.data().notas}`
            this.setState({valueTextarea: noteToShow});
        });        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });   
  }
  

  
  handleChangeTextarea(event) {
    this.setState({valueTextarea: event.target.value});
  }

  sendMood(e){
    const today = new Date()
    const userUID = firebase.auth().currentUser.uid
    console.log(userUID)
    let refCountry = ''
    firebase.firestore().collection('Users')
    .where("uid","==",userUID)
    .get()//entran todos los datos
    .then((querySnapshot)=> {
        querySnapshot.forEach((doc)=> {
          refCountry = doc.data().country
          console.log(doc.data())
        });  
    })

    //para las notas, revisar si hay ese día y si no crear lo mismo

    firebase.firestore().collection('date')
    .where("userId","==",this.props.userId)
    .where("date","==",today.toLocaleDateString())
    .get()
    .then((querySnapshot)=> {
      if(querySnapshot.docs.length>0){
        
      firebase.firestore().collection("date").doc(querySnapshot.docs['0'].id).set({
        
        date: today.toLocaleDateString(),
        notas: this.state.valueTextarea,
        country: refCountry,
        userId: firebase.auth().currentUser.uid
      }, { merge: true })
      .then(function() {
          console.log("Document successfully written!");
          
         // console.log(firebase.firestore().collection("date").doc(querySnapshot.docs['0'].id).data().notas)
          { alert('Datos guardados ;)'); }
        })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
     } else {///si no poner un registro nuevo y añadir ese color
      firebase.firestore().collection('date').add({
        date: today.toLocaleDateString(),
        notas: this.state.valueTextarea,
        //photo: this.state.photos,
        userId: firebase.auth().currentUser.uid
    }) 
    }    
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  

  addMood(color,mood){
    //e.preventDefault(); // <- prevent from reloading the page 
    var today = new Date()
    //para las notas, revisar si hay ese día y si no crear lo mismo

    firebase.firestore().collection('date')
    .where("userId","==",this.props.userId)
    .where("date","==",today.toLocaleDateString())
    .get()
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
     
      if(querySnapshot.docs.length>0){//si ya existe se hace update
      //si este usuario para esta fecha ya tiene un registro creado
      //al darle click a un color actualizarlo con el color que haya clickado
    
      firebase.firestore().collection("date").doc(querySnapshot.docs['0'].id).set({
        colorValue: CalendarService.getNumberByColor(color),    //guardar este color en firebase al hacer click------
        date: today.toLocaleDateString(),
        mood: mood,
        userId: firebase.auth().currentUser.uid
      }, { merge: true })
      .then(function() {
          console.log("Document successfully written! mood",mood);
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
     } else {///si no poner un registro nuevo y añadir ese color
    
      firebase.firestore().collection('date').add({
        colorValue: CalendarService.getNumberByColor(color),
        date: today.toLocaleDateString(),
        mood: mood,
        userId: firebase.auth().currentUser.uid
      })   
    }   
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
   
    //intentando pintar en el momento
    /*let cellID2 = today.toLocaleDateString()
   console.log(cellID2)
   var elem = document.getElementById(cellID2);
        if (color === 'blue'){
          elem.style.backgroundColor = 'rgb(52, 152, 219)';
        
        } else if (color === 'red'){
          elem.style.backgroundColor = 'rgb(192, 57, 43)';
    
        } else if (color === 'yellow'){
          elem.style.backgroundColor = 'rgb(241, 196, 15)';
    
        } else if (color === 'green'){
          elem.style.backgroundColor = 'rgb(39, 174, 96)';
    
        } else if (color === 'black'){
          elem.style.backgroundColor = 'black';
    
        } else if (color === 'grey'){
          elem.style.backgroundColor = 'rgb(127, 140, 141)';
        } */

  }

  render() { 
    return (
      <div>
       <div className='listaMoods'>
          <p>How do you feel today!</p>
          <ul>
            <li onClick={()=>{this.addMood('blue','sad')}} className='blue'>Sad</li>
            <li onClick={()=>{this.addMood('green','calm')}} className='green'>Calm</li>
            <li onClick={()=>{this.addMood('yellow','happy')}} className='yellow'>Happy</li>
            <li onClick={()=>{this.addMood('red','angry')}} className='red'>Angry</li>
            <li onClick={()=>{this.addMood('black','afraid')}} className='black'>Afraid</li>
            <li onClick={()=>{this.addMood('grey','meh')}} className='grey'>Meh</li>
          </ul>
        </div>
        
            <div id='addTodayNotes' className="notes addForm">Add notes: 
            </div>
        
        <div className='addMood'>
          <textarea value={this.state.valueTextarea} onChange={this.handleChangeTextarea} rows='2'/>

          <button id='buttonAddNotes' onClick={this.sendMood} type="button">Add mood and notes!</button>
        </div>
      </div>
    );
  }
}

export default AddToday;
