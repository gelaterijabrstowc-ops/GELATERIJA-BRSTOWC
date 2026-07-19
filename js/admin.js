// ==========================================
// GELATERIJA BRSTOWC
// ADMIN - NAROČILA
// ==========================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


import {
    collection,
    getDocs,
    orderBy,
    query
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";



const adminOrders =
document.getElementById("adminOrders");




async function loadOrders(){


    if(!adminOrders) return;



    try{


        const q = query(

            collection(db,"orders"),

            orderBy(
                "createdAt",
                "desc"
            )

        );



        const snapshot =
        await getDocs(q);



        adminOrders.innerHTML="";



        if(snapshot.empty){


            adminOrders.innerHTML =
            "<p>Ni naročil.</p>";


            return;

        }



        snapshot.forEach((doc)=>{


            const order =
            doc.data();



            adminOrders.innerHTML += `


            <div class="admin-order">


                <h3>
                📦 Naročilo
                </h3>


                <p>
                👤 ${order.customerName}
                </p>


                <p>
                📞 ${order.phone}
                </p>


                <p>
                📍 ${order.address}
                </p>



                <p>
                🍦

                ${order.products.map(

                    item =>

                    item.name +
                    " x" +
                    item.quantity

                ).join(", ")}

                </p>



                <p>
                💰

                ${order.total.toFixed(2)} €

                </p>


            </div>


            `;


        });



    }
    catch(error){


        console.error(
            "Napaka pri nalaganju naročil:",
            error
        );


    }


}



loadOrders();
