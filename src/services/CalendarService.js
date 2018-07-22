

export default class CalendarService {
    static getColorByNumber(colorValue){
        let color = ''
        //que le digamos el numero y nos diga el color
        if(colorValue == 4){
          color = 'blue';
        } else if (colorValue == 3){
          color = 'red';
        } else if (colorValue == 6){
          color = 'yellow';
        } else if (colorValue == 5){
          color = 'green';
        } else if (colorValue == 2){
          color = 'black';
        } else if (colorValue == 1){
          color = 'grey';
        } 
        return color
      }

      static getNumberByColor(color){
        let colorValue = ''
        //que le digamos el numero y nos diga el color
        if(color == 'blue'){
          colorValue = 4;
        } else if (color == 'red'){
          colorValue = 3;
        } else if (color == 'yellow'){
          colorValue = 6;
        } else if (color == 'green'){
          colorValue = 5;
        } else if (color == 'black'){
          colorValue = 2;
        } else if (color == 'grey'){
          colorValue = 1;
        } 
        return colorValue
      }

      static paintWhiteCells(){
        return 'noColor'
      }

      static  initDate(){
        //hacer un objeto que tenga date y color value-- done
        let oneYear = {}
        const today = new Date()
        let d = new Date(today.getFullYear(),0,0)
        let final = new Date(today.getFullYear(),11,31)
        
        
        while (d.getTime() !== final.getTime()) {
           var i = new Date (d.setDate(d.getDate()+1))
          oneYear[i.toLocaleDateString()]=0
        }
        return oneYear
        
      }

}

//para llamarla ej AuthService.login(this.state.email, this.state.password)