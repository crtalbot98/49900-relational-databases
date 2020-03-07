import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCabFCmFsUYns-GIg-74Fp-sjQGIUQUe2w",
    authDomain: "relational-databases-ee579.firebaseapp.com",
    databaseURL: "https://relational-databases-ee579.firebaseio.com",
    projectId: "relational-databases-ee579",
    storageBucket: "relational-databases-ee579.appspot.com",
    messagingSenderId: "729277438438",
    appId: "1:729277438438:web:84a6118a5b76268d669e27"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;