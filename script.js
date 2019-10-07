// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDgxHVc8fhQpKKCph1A-yeJ4E03s_iIUw8",
    authDomain: "car-rental-ecd02.firebaseapp.com",
    databaseURL: "https://car-rental-ecd02.firebaseio.com",
    projectId: "car-rental-ecd02",
    storageBucket: "car-rental-ecd02.appspot.com",
    messagingSenderId: "209167860491",
    appId: "1:209167860491:web:ae36d6ac62942f147a980e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

// Add a new document in collection "cities"
function add(){
    carsSearch = getFromParam();
    db.collection("cars").doc().set({
        name: carsSearch.name,
        price: carsSearch.price,
    })
    .then(function () {
        console.log("Document successfully written!");
    })
    .catch(function (error) {
        console.error("Error writing document: ", error);
    });
}

function getFromParam(){
    return {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
    }
}

