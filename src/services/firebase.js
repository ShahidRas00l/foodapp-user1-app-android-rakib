import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBtU77l3tDrMgXtefIxfxfRZSxDWwShMoQ",
    authDomain: "foodapps-13a48.firebaseapp.com",
    databaseURL: "https://foodapps-13a48.firebaseio.com",
    projectId: "foodapps-13a48",
    messagingSenderId: "759853842483",
    storageBucket: "foodapps-13a48.appspot.com",

    appId: "1:759853842483:web:60c7a59817e3d51a312346",
    measurementId: "G-JWE20DH1YE"
};

firebase.initializeApp(config);
export default firebase;
