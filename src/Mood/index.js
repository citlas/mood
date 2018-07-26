import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';
//import AddToday from '../AddToday';
import CalendarService from '../services/CalendarService';
//import Button from '../Button';
//import { withRouter } from 'react-router-dom'
//import { Link } from 'react-router-dom';
//import ReactDOM from 'react-dom'

//aqui ya le estoy pasando userID por props en usermood

class Mood extends Component {
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
      valueTextarea: '',
      cell: '',
      oneYear: CalendarService.initDate(),
      color: '',
      active: false,
      mood2Show: '',
      notas2Show: '',
      picUrl: '',
      cellID: ''
    }
    //const db = firebase.auth()
    //this.userIDFire = db.currentUser.uid;
    const dbFirestore = firebase.firestore()
    this.fbColDate = dbFirestore.collection('date');
    
 //hacer los bind
 this.showMessage = this.showMessage.bind(this);

    
    //this.getColorByNumber = this.getColorByNumber.bind(this);
  }


  //component did mount llamar a date a 
  //where mirar https://firebase.google.com/docs/firestore/query-data/get-data
  //array con todos los dates
  //render pasarle a cada fecha sus datos
  
 

  componentDidMount(){
   
    console.log(this.props.userId)
    firebase.firestore().collection('date').where("userId","==",this.props.userId)
    .onSnapshot((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
    console.log(querySnapshot)
      let userOneYear = {} //recolectar fechas de firebase
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            let cellIDtoPaint = `${doc.data().date}`
            userOneYear[cellIDtoPaint]= doc.data().colorValue//esto me hace un objeto con el colorvalue de cada fecha          
            this.setState({picUrl:doc.data().pictureUrl})
            //console.log('pictureUrl',doc.data().pictureUrl)
            //this.oneyear - la fecha que estamos calculando, asignamos como valor el numero que venga de firebase         
        });

        //sustuituir en el obj de oneyear las fechas que hay aqui
        //sacar un el oneyear
        let oneYearTemp = this.state.oneYear
        oneYearTemp = Object.assign(oneYearTemp, userOneYear); 
        this.setState({oneYear:oneYearTemp})   
    })
    
    
   
  }

  componentDidUpdate(prevProps, prevState){
    //if(prevProps.isFav !== this.props.isFav){
     // this.setState({isFav: this.props.isFav});
     console.log('component did update')
    //}
  }

showMessage(id){
  console.log(id)
    firebase.firestore().collection('date').where("userId","==",this.props.userId)
    .where("date","==",id)
    .get()
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
      
        querySnapshot.forEach((doc)=> {
            let noteToShow = `${doc.data().notas}`
            let moodToShow = `${doc.data().mood}`
            let imageToShow = doc.data().pictureUrl
            //console.log(noteToShow)
            this.setState({active: true});
            this.setState({cellID: id});
            this.setState({mood2Show: moodToShow});
            this.setState({notas2Show: noteToShow});
            this.setState({picUrl: imageToShow});

           console.log('show message')
           console.log(this.state.picUrl)

        //alert(`mood: ${moodToShow}, notes: ${noteToShow}, picture: `)
        });
         
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 

   
}

  render() {
    //Mostrar los moods del año
    //al hacer click en un cuadro o en agregar mood de hoy, agregar mood
    

    let cell = [];
    let rows = [];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    
    for (var i = 0; i < 12; i++){
      cell.push(<td 
        key={months[i]} 
        className='months cell' >
        {months[i]}
        </td>)   
    }  
    
    rows.push(<tr key='0' >{cell}</tr>)
    
    var thisYear = new Date()

    for (i = 1; i < 32; i++){//dia
      let rowID = `${i}`
      let cell = [];
      for (var idx = 1; idx < 13; idx++){//mes
        //iterar por filas y colimnas quitando el cell id, ref
        let cellID = `${i}/${idx}/${thisYear.getFullYear()}`//calcular para que sea 28/03/2018 en string
        //preguntar si object.cell id existe para dibjar y hacemos un push vacio

        //sacar el valor
        let className=`days cell`
        let dia = ''

        const dateValue = this.state.oneYear[cellID]//estoy llamando al valor de ese dia
        if (typeof dateValue !== 'undefined'){
          dia = i;
          className=`days cell ${CalendarService.getColorByNumber(dateValue)}`
        } 
        
        cell.push(<td 
          key={cellID} 
          value='' 
          className= {className}
          show='true' 
          id={cellID}
          onClick={ () => this.showMessage(cellID) }
          >
          {dia}
          </td>)
        
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
        <div id='oldData' active={this.state.active}>
      {this.state.active ? 
        <div>
          <p>{this.state.cellID}</p>
          <p>Mood that day: {this.state.mood2Show}</p>
          <p>Notes that day: {this.state.notas2Show}</p>
          {this.state.picUrl ? <img id='imageToShow' src={this.state.picUrl} alt='imagen del dia'/> : null }
        </div>
        : null }
        

      </div>
      </div>
    )
  }
}

export default Mood;
