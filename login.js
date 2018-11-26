// Initialize Firebase
var config = {
apiKey: "AIzaSyADKCgGFC6Z_MG1goRDQeJYLUlT99oNF-E",
authDomain: "badekarpadlingen-788b9.firebaseapp.com",
databaseURL: "https://badekarpadlingen-788b9.firebaseio.com",
projectId: "badekarpadlingen-788b9",
storageBucket: "badekarpadlingen-788b9.appspot.com",
messagingSenderId: "238607655638"
};
firebase.initializeApp(config);
// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("userDiv").style.display = "initial";
    document.getElementById("login").style.display = "none";

    //var user = firebase.auth().currentUser;

  } else {
    // No user is signed in.
    document.getElementById("userDiv").style.display = "none";
    document.getElementById("login").style.display = "initial";
  }
});

function login(){
  var userEmail = document.getElementById("Email_field").value;
  var userPassword = document.getElementById("Password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  window.alert("Error: " + errorMessage);
});
}


function logout(){

  firebase.auth().signOut();

}
