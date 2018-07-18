import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';
//import Button from '../Button';
//import { withRouter } from 'react-router-dom'
//import { Link } from 'react-router-dom';
//import ReactDOM from 'react-dom'



class MyMood extends Component {
  constructor(props){
    super(props);

    this.state = {
      colorValue: 0,
      uid: '',
      date: '',
      mood: '',
      notas: '',
      photo: '',
      userId: '',//aqui va uid
      valueTextarea: ''
    }
    //hacer los bind
    this.addMood = this.addMood.bind(this);
    this.sendMood = this.sendMood.bind(this);
    this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
  }

  handleChangeTextarea(event) {
    this.setState({valueTextarea: event.target.value});
  }

  sendMood(e){
    this.setState({date: new Date().toLocaleTimeString()});
   
    this.setState({photo: 'aqui poner url?'});

    firebase.firestore().collection('date').add({
      colorValue: this.state.colorValue,
      date: this.state.date,
      mood: this.state.mood,
      notas: this.state.valueTextarea,
      //photo: this.state.photos,
      userId: firebase.auth().currentUser.uid
  })
  { alert('hecho'); }
  }

  addMood(e){
    e.preventDefault(); // <- prevent from reloading the page
    

    var today = new Date()
    //console.log('mes empezando con cero ',today.getMonth())
    //console.log('dia ',today.getDate())
    let cellID2 = `cell${today.getDate()}-${today.getMonth()}`
    //console.log('founded',React.findDOMNode(this.refs.cell17-6).value);
    console.log(cellID2)
    var elem = document.getElementById(cellID2);
    
    if (e.target.className === 'blue'){
      this.setState({colorValue: 4});
      this.setState({mood: 'sad'});
      elem.style.backgroundColor = 'rgb(52, 152, 219)';
    
    } else if (e.target.className === 'red'){
      elem.style.backgroundColor = 'rgb(192, 57, 43)';
      this.setState({colorValue: 3});
      this.setState({mood: 'angry'});

    } else if (e.target.className === 'yellow'){
      elem.style.backgroundColor = 'rgb(241, 196, 15)';
      this.setState({colorValue: 6});
      this.setState({mood: 'happy'});

    } else if (e.target.className === 'green'){
      elem.style.backgroundColor = 'rgb(39, 174, 96)';
      this.setState({colorValue: 5});
      this.setState({mood: 'calm'});

    } else if (e.target.className === 'black'){
      elem.style.backgroundColor = 'black';
      this.setState({colorValue: 2});
      this.setState({mood: 'afraid'});

    } else if (e.target.className === 'grey'){
      elem.style.backgroundColor = 'rgb(127, 140, 141)';
      this.setState({colorValue: 1});
      this.setState({mood: 'meh'});
    } 
  }

  componentDidMount() {
    console.log("componentDidMount START");
    //llamar a firebase
  }

  render() {
    //Mostrar los moods del año
    //al hacer click en un cuadro o en agregar mood de hoy, agregar mood
    


    let rows = [];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    for (var i = 0; i < 32; i++){
      let rowID = `${i}`
      let cell = [];
      for (var idx = 0; idx < 12; idx++){
        let cellID = `cell${i}-${idx}`
        if(rowID<1){
            cell.push(<td 
              key={cellID} 
              value='' 
              className='months cell' 
              id={cellID}>
              {months[idx]}
              </td>) 
        } else {
          cell.push(<td 
            key={cellID} 
            value='' 
            className='days cell' 
            onClick='hacer cambio para que vean las fotos y notas del dia'
            show='true' 
            ref={cellID}
            id={cellID}>
            {rowID}
            </td>)
        }
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
      
    }
    
    return(
      
      <div className="container">
        <div className="row">
          <div className="col s12 board">
            <table id="simple-board">
               <tbody>
                 {rows}
               </tbody>
             </table>
          </div>
        </div>
       
        <div className='listaMoods'>
          <p>Add today!</p>
          <ul>
            <li onClick={this.addMood} className='blue'>Blue - Sad</li>
            <li onClick={this.addMood} className='red'>Red - Angry</li>
            <li onClick={this.addMood} className='yellow'>Yellow - Happy</li>
            <li onClick={this.addMood} className='green'>Green - Calm</li>
            <li onClick={this.addMood} className='black'>Black - Afraid</li>
            <li onClick={this.addMood} className='grey'>Grey - Meh</li>
          </ul>
        </div>
        
        <div className='addForm'>
        Do you want to add a picture?
        </div>
            <select id='addTodayPic'>
              <option value="true">Yes!</option>
              <option value="false">No!</option>
            </select>
            <div id='addTodayNotes' className="notes addForm">Add notes: 
            </div>
            <textarea valueTextarea={this.state.valueTextarea} onChange={this.handleChangeTextarea} rows='4'/>
        
        <div className='addMood'>
          <button onClick={this.sendMood} type="button">Add!</button>
        </div>

      </div>
    )
  }
}

export default MyMood;
