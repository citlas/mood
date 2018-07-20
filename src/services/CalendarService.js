import firebase from 'firebase';

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


}

//para llamarla ej AuthService.login(this.state.email, this.state.password)