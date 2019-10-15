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

//STORE
var store = {
    debug: true,
    state: {
        selectedCar: {},
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

//COMPONENTS

Vue.component('consult-car',
    {
        data: function () {
            return {
                selectedCar: {
                    id: "",
                    name: "",
                    price: "",
                },
            }
        },
        template: ` 
            <div class="mt-3 row">
                <cars-list></cars-list>
                <car-details></car-details>
            </div>
        `,
    }
);

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
                <add-car v-on:update-list-cars="getCars()"></add-car>
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

Vue.component('add-car', {
    data: function () {
        return {
            addedCar: {
                id: "",
                name: "",
                price: "",
            },
        }
    },
    template:
        ` 
    <div class="list-group overflow-auto">
        <button type="button" class="list-group-item list-group-item-action text-primary" data-toggle="modal"
            data-target="#addCarModal">
            + Ajouter un vehicule
        </button>
        <div class="modal fade" id="addCarModal" tabindex="-1" role="dialog" aria-labelledby="addCarModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addCarModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="text" v-model="addedCar.name">
                        <input type="text" v-model="addedCar.price">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
                        <button v-on:click="addCar(); $emit('update-list-cars')" type="button" class="btn btn-primary">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        addCar: function () {
            var self = this;
            db.collection("cars").add({
                name: this.addedCar.name,
                price: this.addedCar.price,
            })
                .then(function (docRef) {
                    console.log("Document successfully written!");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        },
    }
})

Vue.component('car-details', {
    data: function () {
        return {
            store: store.state
        }
    },
    template:
        `
    <div class="col-8 border rounded p-3">
        <div v-if="store.selectedCar.id==null " class="align-middle text-center text-muted" style="margin-top:20%">
            Selectionner un vehicule
        </div>
        <div class="p-3 row" v-if="store.selectedCar.id!=null ">
            <div class="col-12 font-weight-bold text-right">
                <a class="text-primary mr-2" type="button" data-toggle="modal" data-target="#addAvailabilityModal">
                    <i class="far fa-calendar-plus" style="font-size:20px;"></i>
                </a>
                <span>{{store.selectedCar.data.price}}</span>
                <span>MAD</span>
            </div>
            <input v-on:click="deleteCar()" class="btn btn-danger position-absolute mb-3 mr-5 col-4" style="bottom:0; right:0; width:100px"
                type="button" value="Supprimer">
        </div>
        <div v-if="store.selectedCar.id!=null" class="row">
            <div class="col-4">
                <img src="Assets/car.png" style="width:inherit; height:inherit"/>
            </div>
            <div class="font-weight-bold col-8" style="font-size:24px">
                {{store.selectedCar.data.name}}
            </div>
        </div>
    </div> 
`,
    methods: {
        deleteCar: function () {
            var self = this;
            db.collection("cars").doc(self.store.selectedCar.id).delete().then(function () {
                console.log("Document successfully deleted!");
                // self.getCars();
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        },
    }
})



var app = new Vue({
    el: '#app',
    data: {

    },
})

