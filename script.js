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

var app = new Vue({
    el: '#app',
    data: {
        cars: [],
        selectedCar: {
            id: "",
            name: "",
            price: "",
        },
        addedCar: {
            id:"",
            name: "",
            price: "",
        },
        addedAvailability: {
            carID: "",
            description: "",
            price: "",
            startDate: "",
            endDate: ""
        }
    },
    mounted: function () {
        this.getCars();
    },
    methods: {
        getCars: function () {
            var self = this;
            self.cars=[];
            db.collection("cars").get()
                .then(function (querySnapshot) {
                    console.log("Document successfully written!");
                    querySnapshot.forEach(function (doc) {
                        self.cars.push(
                            {
                                id: doc.id,
                                name: doc.data().name,
                                price: doc.data().price
                            }
                        );
                    });
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                })
        },
        addCar: function () {
            var self = this;
            db.collection("cars").add({
                name: this.addedCar.name,
                price: this.addedCar.price,
            })
                .then(function (docRef) {
                    console.log("Document successfully written!");
                    self.addDefaultAvailablity(docRef.id);
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        addDefaultAvailablity: function(carId){
            var self = this;
            db.collection("availability").add({
                carID: carId,
                description: "Default",
                price: this.addedCar.price,
                startDate: new Date(),
                endDate: ""
            })
                .then(function (docRef) {
                    console.log("Document successfully written!");
                    self.getCars();
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        addAvailablity: function(){
            var self = this;
            db.collection("availability").add(
                {
                    
                }
            )
                .then(function (docRef) {
                    console.log("Document successfully written!");
                    self.getCars();
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
        deleteCar: function () {
            var self = this;
            db.collection("cars").doc(this.selectedCar.id).delete().then(function () {
                console.log("Document successfully deleted!");
                self.getCars();
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        },
    }
})

