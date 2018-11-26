//window.alert("Okay");

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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("userDiv").style.display = "initial";
    document.getElementById("slideshow").style.display = "none";
    document.getElementById("list_div").style.display = "initial";

    //var user = firebase.auth().currentUser;

  } else {
    // No user is signed in.
    document.getElementById("userDiv").style.display = "none";
    document.getElementById("slideshow").style.display = "initial";
    document.getElementById("list_div").style.display = "none";
  }
});


function submitClick(){

  // Add a new document in collection "cities"
  var nameText = document.getElementById("Name").value;
  var emailText = document.getElementById("Email").value;

if(document.getElementById("Name").value  == "" || document.getElementById("Email").value == ""){
  window.alert("Du må fylle ut begge felter.")
} else {
  db.collection("Users").doc().set({
      name: nameText,
      email: emailText
  })
  .then(function() {
      console.log("Document successfully written!");
      document.getElementById("Name").value = "";
      document.getElementById("Email").value = "";
  })
  .catch(function(error) {
      window.alert("Error writing document: "+ error);
  });
}
}

const list_div = document.querySelector("#list_div");

db.collection("Users").onSnapshot(function(querySnapshot){
  querySnapshot.docChanges().forEach(function(change){
    if(change.type === "added"){
      list_div.innerHTML += "<div class='list_item'><h3>" + change.doc.data().name + "</h3><p>Email: " + change.doc.data().email + "</p></div>";
    }
  });
});
