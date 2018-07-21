import React from 'react';

import CustomDropZone from './CustomDropZone'
//import Countries from './Countries'

export default class Basic extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            picture              : ''
        }

        this.updateFormInputElegant = this.updateFormInputElegant.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
  
   submitForm(){
        //LLAMAR A FIREBASE FIRESTORE Y GUARDAR REGISTRO CON TODA LA INFO
    }
  
    updateFormInputElegant(field, value){
        this.setState({[field]: value})
    }

    render() {
        console.log('user id ', this.props.userId)

        return (
             
<section>           
<form onSubmit={this.submitForm}>
<div className='addPicture'>
        If you want to add a picture drag a file!
        </div>
<CustomDropZone className='center-drop'
onFileUpload={(fileUrl)=>{this.updateFormInputElegant('picture', fileUrl)}}
acceptedFiles="image/jpeg, image/png"
uploadFolder={this.props.userId}
/>

</form>

</section>

     );

    }
    
  }//fin class