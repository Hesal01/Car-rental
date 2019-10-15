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

var store = {
    state: {
        selectedCar: {}
    },
    setSelectedCar(newValue) {
        if (this.debug) console.log("setSelectedCar declenchee avec ", newValue);
        this.state.selectedCar = newValue;
    },
    clearSelectedCar() {
        if (this.debug) console.log("clearSelectedCar declenchee");
        this.state.selectedCar = {};
    }
}

Vue.component('search-car',{
    data: function(){
        return {

        }
    },
    template
})

Vue.component('cars-list',
    {
        data: function () {
            return {
                cars: [],
                store: store.state,
            }
        },
        template: ` 
            <div class="col-4">
                <div class="list-group overflow-auto" style="height:273px">
                    <button v-for="car in cars" v-on:click="setSelectedCar(car);" v-bind:class="{active: store.selectedCar.id == car.id}"
                        type="button" class="list-group-item list-group-item-action">
                        {{car.data.name}}
                        {{car.data.price}}
                    </button>
                </div>
            </div>
        `,
        mounted: function () {
            this.getCars();
        },
        methods: {
            getCars: function () {
                var self = this;
                self.cars = [];
                db.collection("cars").get()
                    .then(function (querySnapshot) {
                        console.log("Document successfully written!");
                        querySnapshot.forEach(function (doc) {
                            self.cars.push(
                                {
                                    id: doc.id,
                                    data: doc.data()
                                }
                            );
                        });
                    })
                    .catch(function (error) {
                        console.error("Error writing document: ", error);
                    })
            },
            setSelectedCar: function (car) {
                store.setSelectedCar(car);
            }
        }
    }
);

var app = new Vue(
    {
        el: "#app",
    }
)