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
      paintWhite: false,
      alreadySelectedCountry: false 
    }
    this.loadData = this.loadData.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    console.log("componentDidMount START");
    //let selecCon = document.getElementById('selectingCountry')
    //console.log('selected country',selecCon.value)
    this.loadData()
    
  }

  componentDidUpdate(prevProps){
    console.log("componentDidUpdate START");
    console.log('prevProps',prevProps, ' props', this.props)
   // this.loadData(selecCon.val)
   let selecCon = document.getElementById('selectingCountry')
   console.log('country selected in comp did update',selecCon.value)
   /*if (this.props.user !== prevProps.user) {
    if(this.state.alreadySelectedCountry){
      this.setState({alreadySelectedCountry: false})
      if(selecCon.val != 'choose' ){
        this.loadData(selecCon.val)
      }
     }
   }*/
  /**/
   
  }

  loadData(country,age,sexo){
    console.log('country selected on load data',country)

    let db = firebase.firestore().collection('date')
   
    if(country){
      //yo creo que tendrás que hacer el filtro del where luego 
      //de que firebase retorna los resultados porque no he encontrado 
      //en ningún sitio el bug que teníamos con el onSnapshot
      //lo que deberías hacer es:
      //1. Dejar el onsnapshot en componentDidUpdate. 
      //Así siempre se ejecutará cuando cambie algún resultado.
      //2. A penas lleguen los resultados filtrarlos con los filtros que tengas aplicados.
      //3. Calcular el resto tal cual porque no necesitas cambiarlo, solo que los resultados iniciales serán diferentes 

      db = db.where("country","==",country)
      this.setState({alreadySelectedCountry: true})
    }
    db.onSnapshot((querySnapshot)=> {//el arrow function es para que se cree un scope nuevo y el this siga siendo el de state
     // console.log('llamando firebase', querySnapshot)
      let allUsersOneYear = {} //recolectar fechas de firebase
       /* querySnapshot.forEach((doc)=> {
            let cellIDtoPaint = `${doc.data().date}`
            if (!allUsersOneYear[cellIDtoPaint]){
              allUsersOneYear[cellIDtoPaint]={1:0, 2:0,3:0, 4:0, 5:0, 6:0};
            } 
            allUsersOneYear[cellIDtoPaint][doc.data().colorValue]++;
        });*/
        querySnapshot.forEach((doc)=> {
          if(this.state.country && doc.data().country !== this.state.country){
            return;
          }
          let cellIDtoPaint = `${doc.data().date}`
          if (!allUsersOneYear[cellIDtoPaint]){
            allUsersOneYear[cellIDtoPaint]={1:0, 2:0,3:0, 4:0, 5:0, 6:0};
          } 
          allUsersOneYear[cellIDtoPaint][doc.data().colorValue]++;
      });

        let promedio = {}


        for (var date in allUsersOneYear){
        
          let maxNum = 0
          let keyMax = 0
          for (var key in allUsersOneYear[date]){
            if(maxNum<allUsersOneYear[date][key]){
              maxNum=allUsersOneYear[date][key]
              keyMax = key//aqui guardo el numero más grande 
            } 
          }
          allUsersOneYear[date]
          promedio[date]=keyMax
         
        }
       
        let oneYearTemp = this.state.oneYear
        oneYearTemp = Object.assign(CalendarService.initDate(), promedio); 
        this.setState({oneYear:oneYearTemp})   
    })
    
  }

  
  selectCountry(e){
    
    let targetCountry = e.target.value
    this.setState({country: targetCountry});
    
    //lamar a loaddata con country
    this.loadData(targetCountry)
 
    if(targetCountry == 'choose'){
      console.log( window.location.reload())
    }
    
    }

  render() {


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

       
        let className=`days cell`
        let dia = ''

        const dateValue = this.state.oneYear[cellID]//estoy llamando al valor de ese dia
        if (typeof dateValue != 'undefined'){
          dia = i;
          className=`
                    days 
                    cell 
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

         <div className='listaMoods'>
          <p>Key:</p>
          <ul>
            <li className='blue keyHome'>Sad</li>
            <li className='green keyHome' >Calm</li>
            <li className='yellow keyHome'>Happy</li>
            <li className='red keyHome'>Angry</li>
            <li className='black keyHome'>Afraid</li>
            <li className='grey keyHome'>Meh</li>
          </ul>
        </div>

         <div className='filterBy'>
          <p value="country">Filter by country</p>
          <select id='selectingCountry' onChange={this.selectCountry}>
            <option value="choose">Show all!!</option>
            <option value="Argentina">Argentina</option>
            <option value="Mexico">Mexico</option>
            <option value="Spain">Spain</option>
            <option value="Venezuela">Venezuela</option>
          </select>
        </div>

        <div className="row">
          <div className="col s12 board">
            <table id="simple-board">
               <tbody>
                 {rows}
               </tbody>
             </table>
          </div>
        </div>
       
       
        <div className='otrosPublicos'>
          <p>Estos usuarios tienen calendarios publicos:</p>
          <Private />
        </div>
      </div>
      
    )
  }
}

export default Home;
