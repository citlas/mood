import React, { Component } from 'react';
import firebase from 'firebase';
import './index.css';
import AddToday from '../AddToday';
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
      allDates: [],
      oneYear: this.initDate(),
      color: ''
    }
    //const db = firebase.auth()
    //this.userIDFire = db.currentUser.uid;
    const dbFirestore = firebase.firestore()
    this.fbColDate = dbFirestore.collection('date');
    
 //hacer los bind
    
    this.initDate = this.initDate.bind(this);
    
    //this.getColorByNumber = this.getColorByNumber.bind(this);
  }


  //component did mount llamar a date a 
  //where mirar https://firebase.google.com/docs/firestore/query-data/get-data
  //array con todos los dates
  //render pasarle a cada fecha sus datos
  
  initDate(){
    //hacer un objeto que tenga date y color value-- done
    let oneYear = {}
    const today = new Date
    let d = new Date(today.getFullYear(),0,0)
    let final = new Date(today.getFullYear(),11,31)
    
    
    while (d.getTime() !== final.getTime()) {
       var i = new Date (d.setDate(d.getDate()+1))
      oneYear[i.toLocaleDateString()]=0
    }
    return oneYear
    
  }

  componentDidMount(){
   
    var tempArray = []

    //this.loadData()
    
    firebase.firestore().collection('date').where("userId","==",this.props.userId)
    .get()
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state

      let userOneYear = {} //recolectar fechas de firebase
        querySnapshot.forEach((doc)=> {
            // doc.data() is never undefined for query doc snapshots
            let cellIDtoPaint = `${doc.data().date}`
            userOneYear[cellIDtoPaint]= doc.data().colorValue//esto me hace un objeto con el colorvalue de cada fecha          
            //this.oneyear - la fecha que estamos calculando, asignamos como valor el numero que venga de firebase         
        });

        //sustuituir en el obj de oneyear las fechas que hay aqui
        //sacar un el oneyear
        let oneYearTemp = this.state.oneYear
        oneYearTemp = Object.assign(oneYearTemp, userOneYear); 
        this.setState({oneYear:oneYearTemp})   
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    this.setState({allDates: tempArray})
    
   
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.isFav !== this.props.isFav){
     // this.setState({isFav: this.props.isFav});
     console.log('component did update')
    }
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

    for (var i = 1; i < 32; i++){//dia
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
        if (typeof dateValue != 'undefined'){
          dia = i;
          className=`days cell ${CalendarService.getColorByNumber(dateValue)}`
        } 
        
        cell.push(<td 
          key={cellID} 
          value='' 
          className= {className}
          show='true' 
          id={cellID}
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
       
        

      </div>
    )
  }
}

export default Mood;
