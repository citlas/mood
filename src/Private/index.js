import React, { Component } from 'react';
//import './index.css';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
//instale https://react.rocks/example/react-yearly-calendar y https://patientslikeme.github.io/react-calendar-heatmap/ pero no los usé
//import CalendarService from '../services/CalendarService';

class Private extends Component {
  constructor(props){
    super(props);

    this.state = {
      publicUserIds:[],
      isPublicColor:false,
      //rowsToShow:''
      userId:''
    }
    this.publicUid=[]
    this.rowsToShow=[]

    //this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    //console.log("componentDidMount START"); 
    //let publicId = [];//prueba
    //let rowsPublicId = [];//prueba

    let arrayUsers=[]

    firebase.firestore().collection('Users')
    .where("public","==",'true')
    .get()
    .then((querySnapshot)=> {
     querySnapshot.forEach((doc)=> {
       //console.log('uid public true',doc.data().uid)//estos son los uid de los que son publicos
      arrayUsers.push(doc.data())
      this.setState({publicUserIds:arrayUsers})

/*      this.state.publicUserIds.push(doc.data().uid)//aqui guarda ls uid de los public
      console.log('array de public',this.state.publicUserIds)
      rowsPublicId.push(<tr key={doc.data().uid} uid={doc.data().uid} id='publicId'>{doc.data().country}</tr>)//prueba
      this.setState({isPublicColor:true}) 
      console.log('rowsPublicId',rowsPublicId)
      this.rowsToShow=rowsPublicId//prueba*/

      /* 
       //aqui quiero calcular de cada uid su promedio de color para mostrarlo con un color
    for(var i = 0; i<2;i++){
      let publicUserId=this.state.publicUserIds[i]
      console.log('publicUserId ',publicUserId)
      console.log('uids publicos',this.state.publicUserIds)
     firebase.firestore().collection('date').where("userId","==",publicUserId)
     .get()
     .then((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
       let count = 0
       let colorValueToSum = 0

       querySnapshot.forEach((doc)=> {
           colorValueToSum += doc.data().colorValue
           count++
          // publicId.push(doc.data().userId)//prueba
           //console.log(publicId)//prueba
           //rowsPublicId.push(<tr key={i} id={doc.data().userId}>{publicId}</tr>)//prueba

       });
       
       let promedio = (colorValueToSum/count).toFixed(0)  
       //console.log('colorValueToSum',colorValueToSum)
       //console.log('count',count)
       //console.log('promedio publico true',promedio)
       this.setState({isPublicColor:promedio})   

        
      
       //rowsPublicId.push(<tr key='0' >{publicId}</tr>)//prueba
       //this.setState({rowsToShow:rowsPublicId})//prueba
   })
   .catch(function(error) {
       console.log("Error getting documents: ", error);
   });
  }*/
     })
       
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 

 
    }

  render() {
 
   

     //}
     



    return(
      <div>
        
        {
          this.state.publicUserIds.map((e)=>{
            //div que ponga el name y 
            return <Link className='namePublicUsers' to={`/mood/${e.uid}`}>{e.name}</Link>//falla al pasarle el this.props.userId

          })
          //hacer un map
        }
        

        
      </div> 
    )
  }
}

export default Private;
