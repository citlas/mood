import React, { Component } from 'react';
import './index.css';
//importar firebase
//instale https://react.rocks/example/react-yearly-calendar y https://patientslikeme.github.io/react-calendar-heatmap/ pero no los usé

class Home extends Component {
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

    //header
    //titulo
    //menu login register logout
    //tabla con todos los cuadritos
    //checar los moods de todos los usuarios por dia 
    //y hacer una media
    //buscar tablas por usuario
    //mostrar tablas públicas

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
            //onClick= 
            show='true' 
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
          <select>
            <option value="country">Country</option>
            <option value="sex">Sex</option>
            <option value="age">Age</option>
          </select>
        </div>
        <div className='otrosPublicos'>
          <p>aqui van otros publicos</p>
        </div>
      </div>
    )
  }
}

export default Home;
