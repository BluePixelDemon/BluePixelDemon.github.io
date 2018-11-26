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


var deltakereRef = db.collection("Deltakerteam");

  const list_div = document.querySelector("#list_div1");

  deltakereRef.where("Poeng", ">", 0).orderBy("Poeng", "desc").onSnapshot(function(querySnapshot){
    querySnapshot.docChanges().forEach(function(change){
      if(change.type === "added"){
      list_div.innerHTML += "<div class='list_item1 jumbotron' id='divs'><h3 class='display-4 listHeader'>" + change.doc.data().Name + "</h3><p class='lead listP'>Poeng: " + change.doc.data().Poeng + "</p></div>";
      }
    })
  })
  



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    //window.alert("user signed in.")
    document.getElementById("listBtn").style.display = "initial";
    document.getElementById("listInputName").style.display = "initial";
    document.getElementById("listInputPoeng").style.display = "initial";

    //var user = firebase.auth().currentUser;

  } else {
    // No user is signed in.
    //window.alert("user not signed in.")
    document.getElementById("listBtn").style.display = "none";
    document.getElementById("listInput").style.display = "none";
  }
});


function updatePoeng(){
  var Name = document.getElementById("listInputName").value;
  var Poeng = Number(document.getElementById("listInputPoeng").value);
  db.collection("Deltakerteam").doc(Name).update({
    "Poeng": Poeng
  })
  .then(function(){
    console.log("Document updated successfully.")
  })
}
