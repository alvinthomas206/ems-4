import firebase from 'firebase' ;
require('@firebase/firestore')

const firebaseConfig = {
    apiKey: "AIzaSyB9NQd3NoXtP8rcJtFjkMn1qjkjYt5nMP4",
    authDomain: "ems-app-fbd63.firebaseapp.com",
    projectId: "ems-app-fbd63",
    storageBucket: "ems-app-fbd63.appspot.com",
    messagingSenderId: "768007434282",
    appId: "1:768007434282:web:75273b601c1e0f67479353"
};

firebase.initializeApp(firebaseConfig)
export default firebase.firestore();
