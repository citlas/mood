import React, { Component } from 'react';
import './index.css';
import firebase from 'firebase';
//instale https://react.rocks/example/react-yearly-calendar y https://patientslikeme.github.io/react-calendar-heatmap/ pero no los usé
import CalendarService from '../services/CalendarService';
import Private from '../Private';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      oneYear: CalendarService.initDate(),
      country: '',
      paintWhite: false 
    }

    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount START");

    firebase.firestore().collection('date')
    .get()//entran todos los datos
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
      console.log('llamando firebase')
      let allUsersOneYear = {} //recolectar fechas de firebase
        querySnapshot.forEach((doc)=> {
            
            let cellIDtoPaint = `${doc.data().date}`
            if (!allUsersOneYear[cellIDtoPaint]){
              allUsersOneYear[cellIDtoPaint]={
                total: doc.data().colorValue,
                count: 1
              }
            } else {
              allUsersOneYear[cellIDtoPaint].total += doc.data().colorValue
              allUsersOneYear[cellIDtoPaint].count++
            }
        });

        
        let promedio = {}
        for (var date in allUsersOneYear){
          promedio[date] = (allUsersOneYear[date].total/allUsersOneYear[date].count).toFixed(0)  
        }
        console.log(allUsersOneYear)
        console.log(promedio)
        //sustituir en el obj de oneyear las fechas que hay aqui
       
        let oneYearTemp = this.state.oneYear
        oneYearTemp = Object.assign(oneYearTemp, promedio); 
        this.setState({oneYear:oneYearTemp})   
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  
  selectCountry(e){
    let targetCountry = e.target.value
    this.setState({country: targetCountry});
    console.log(targetCountry)

    //this.state.paintWhite = true
    

    firebase.firestore().collection('date')
    .where("country","==",targetCountry)
    .get()//entran todos los datos
    .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
      console.log('llamando firebase')
      
      
      let allUsersOneYear = {} //recolectar fechas de firebase
        querySnapshot.forEach((doc)=> {
            
            let cellIDtoPaint = `${doc.data().date}`
          console.log(cellIDtoPaint)
        
            if (!allUsersOneYear[cellIDtoPaint]){
              allUsersOneYear[cellIDtoPaint]={
                total: doc.data().colorValue,
                count: 1
              }
            } else {
              allUsersOneYear[cellIDtoPaint].total += doc.data().colorValue
              allUsersOneYear[cellIDtoPaint].count++
            }
        });

        
        let promedio = {}
        for (var date in allUsersOneYear){
          promedio[date] = (allUsersOneYear[date].total/allUsersOneYear[date].count).toFixed(0)  
        }
        //console.log(allUsersOneYear)
        //console.log(promedio)
        
        let oneYearTemp = this.state.oneYear
        oneYearTemp = Object.assign(oneYearTemp, promedio); 
        console.log(oneYearTemp)
        this.setState({oneYear:oneYearTemp})   
        
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    }

  render() {

    //header
    //titulo
    //menu login register logout
    //tabla con todos los cuadritos
    //checar los moods de todos los usuarios por dia 
    //y hacer una media
    //buscar tablas por usuario
    //mostrar tablas públicas


    //pegar la tabla y despues convertirlo en componente que pinte fechas
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

    for ( var i = 1; i < 32; i++){//dia
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
          className=`
                    days 
                    cell 
                    ${this.state.paintWhite ? CalendarService.paintWhiteCells() : ''}
                    ${CalendarService.getColorByNumber(dateValue)}
                  `
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
       
        

      

      
        <div className='listaMoods'>
          <p>Key:</p>
          <ul>
            <li className='blue'>Blue - Sad</li>
            <li className='red'>Red - Angry</li>
            <li className='yellow'>Yellow - Happy</li>
            <li className='green'>Green - Calm</li>
            <li className='black'>Black - Afraid</li>
            <li className='grey'>Grey - Meh</li>
          </ul>
        </div>
        <div className='filterBy'>
          <p value="country">Filter by country</p>
          <select onChange={this.selectCountry}>
            <option value="choose">Choose one</option>
            <option value="Argentina">Argentina</option>
            <option value="Mexico">Mexico</option>
            <option value="Spain">Spain</option>
            <option value="Venezuela">Venezuela</option>
          </select>
        </div>
        <div className='otrosPublicos'>
          <p>aqui van otros calendarios publicos</p>
          <Private />
        </div>
      </div>
      
    )
  }
}

export default Home;
