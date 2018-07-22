import React, { Component } from 'react';
//import './index.css';
import firebase from 'firebase';
//instale https://react.rocks/example/react-yearly-calendar y https://patientslikeme.github.io/react-calendar-heatmap/ pero no los usé
//import CalendarService from '../services/CalendarService';

class Private extends Component {
  constructor(props){
    super(props);

    this.state = {
      publicUserIds:[],
      isPublicColor:0
    }
    this.publicUid=[]

    //this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount START"); 
    firebase.firestore().collection('Users')
    .where("public","==",'true')
    .get()
    .then((querySnapshot)=> {
     querySnapshot.forEach((doc)=> {
       console.log(doc.data().uid)//estos son los uid de los que son publicos
       this.state.publicUserIds.push(doc.data().uid)
     
     })
       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 

    //aqui quiero calcular de cada uid su promedio de color
    for(var i = 0; i<3;i++){
      let publicUserId=this.state.publicUserIds[i]
      console.log(publicUserId)
     firebase.firestore().collection('date').where("userId","==",`e8NIe3WlEGbSTWqFLM6o9NAGwvr1`)
     .get()
     .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
       let count = 0
       let colorValueToSum = 0
       querySnapshot.forEach((doc)=> {
           colorValueToSum += `${doc.data().colorValue}`
           count++
       });
       
       let promedio = colorValueToSum/count.toFixed(0)  
       console.log('promedio',promedio)
       this.setState({isPublicColor:promedio})   

       
   })
   .catch(function(error) {
       console.log("Error getting documents: ", error);
   });
  }
    }

  render() {
 
   

     //}
     



    return(
      <div>
        {this.state.isPublicColor ? <p>si hay y es {this.state.isPublicColor}</p> : <p>no hay</p>}
      </div> 
    )
  }
}

export default Private;
