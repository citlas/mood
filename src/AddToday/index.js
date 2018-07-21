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
            console.log(noteToShow)
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
       
        userId: firebase.auth().currentUser.uid
      }, { merge: true })
      .then(function() {
          console.log("Document successfully written!");
          
          console.log(firebase.firestore().collection("date").doc(querySnapshot.docs['0'].id).data().notas)
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
          console.log("Document successfully written!");
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
  }

  render() { 
    return (
      <div>
       <div className='listaMoods'>
          <p>Add today!</p>
          <ul>
            <li onClick={()=>{this.addMood('blue','sad')}} className='blue'>Blue - Sad</li>
            <li onClick={()=>{this.addMood('red','angry')}} className='red'>Red - Angry</li>
            <li onClick={()=>{this.addMood('yellow','happy')}} className='yellow'>Yellow - Happy</li>
            <li onClick={()=>{this.addMood('green','calm')}} className='green'>Green - Calm</li>
            <li onClick={()=>{this.addMood('black','afraid')}} className='black'>Black - Afraid</li>
            <li onClick={()=>{this.addMood('grey','meh')}} className='grey'>Grey - Meh</li>
          </ul>
        </div>
        
            <div id='addTodayNotes' className="notes addForm">Add notes: 
            </div>
            <textarea value={this.state.valueTextarea} onChange={this.handleChangeTextarea} rows='4'/>
        
        <div className='addMood'>
          <button onClick={this.sendMood} type="button">Add!</button>
        </div>
      </div>
    );
  }
}

export default AddToday;
