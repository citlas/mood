import firebase from 'firebase';

export default class UploadService {
    static uploadFile(file, uploadFolder){
        return new Promise((resolve, reject) => {
            const fileName = `${+(new Date())}-${file.name}`;
            const storageRef = firebase.storage().ref();
            const myImageRef = storageRef.child(`${uploadFolder}/${fileName}`);
            const uploadTask = myImageRef.put(file);

            uploadTask.on( //Recibe un string y tres funciones
                'state_changed', 
                (snapshot) => {
                    // const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // this.setState({
                    //     uploadProgress: percentage,
                    //     loading: true
                    // });
                }, 
                (error) => {
                    reject('Ocurrió un error subiendo el archivo')
                }, 
                () => {
                    // Upload complete
                    uploadTask.snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {

                            const today = new Date()
   
                            firebase.firestore().collection('date')
                            .where("userId","==",firebase.auth().currentUser.uid)
                            .where("date","==",today.toLocaleDateString())
                            .get()
                            .then((querySnapshot)=> {
                              if(querySnapshot.docs.length>0){
                                
                              firebase.firestore().collection("date").doc(querySnapshot.docs['0'].id).set({
                                pictureUrl: downloadURL,
                                
                              }, { merge: true })
                              .then(function() {
                                  { alert('foto guardada ;)'); }
                                })
                              .catch(function(error) {
                                  console.error("Error writing document: ", error);
                              });
                             }    
                            })
                            .catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });



                            
                            resolve(downloadURL);

                        });
                });
        })
    }
}