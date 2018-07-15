import React, { Component } from 'react';
//importar firebase
import './index.css';


class MyMood extends Component {
  constructor(props){
    super(props);

    this.state = {
     
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
            onClick='poner aqui cambio' 
            show='true' 
            id={cellID}>
            {rowID}
            </td>)
        }
      }
      rows.push(<tr key={i} id={rowID}>{cell}</tr>)
      console.log(cell)
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
        <div className='addToday'>
          <button type="button">Add today!</button>
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
        
      </div>
    )
  }
}

export default MyMood;
