import React, { Component } from 'react';
//importar firebase
import './index.css';


class AddToday extends Component {
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
    //Mostrar fecha
    //select mood
    //añadir photo
    //notas
    //submit
    
    return (
      <div>
        <p className='titleAdd'>It is {new Date().toLocaleTimeString()}.</p>
        <div >
            <div className='addForm'>My mood today is/was... </div>
            <select id='addTodayMood'>
              <option value="blue">:( Sad</option>
              <option value="red">>:( Angry</option>
              <option value="yellow">:D Happy</option>
              <option value="green">:) Calm</option>
              <option value="black">:S Afraid</option>
              <option value="grey">:| Meh</option>
            </select>
            <div className='addForm'>Do you want to add a picture?</div>
            <select id='addTodayPic'>
              <option value="true">Yes!</option>
              <option value="false">No!</option>
            </select>
            <div id='addTodayNotes' className="notes addForm">Add notes: </div>
            <textarea rows='4'/>
        </div>
        <div className='addMood'>
          <button type="button">Add!</button>
        </div>
      </div>
    );
  }
}

export default AddToday;
