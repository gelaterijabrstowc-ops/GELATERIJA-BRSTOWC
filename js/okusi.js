// ==========================================
// GELATERIJA BRSTOWC
// OKUSI - FIRESTORE
// ==========================================

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// Element kjer se prikažejo izdelki

const productsContainer = document.getElementById("productsContainer");


// Naloži izdelke

async function loadProducts() {

    if (!productsContainer) return;


    try {


        const productsQuery = query(
            collection(db, "products"),
            where("available", "==", true)
        );


        const snapshot = await getDocs(productsQuery);


        productsContainer.innerHTML = "";


        if (snapshot.empty) {

            productsContainer.innerHTML = 
            "<p>Trenutno ni izdelkov.</p>";

            return;

        }



        snapshot.forEach((doc) => {


            const product = doc.data();


            const card = document.createElement("div");

            card.className = "product-card";


            card.innerHTML = `

                <img 
                src="${product.image}" 
                alt="${product.name}">


                <div class="product-info">


                    <span class="category">
                    ${product.category}
                    </span>


                    <h3>
                    ${product.name}
                    </h3>


                    <p>
                    ${product.description}
                    </p>


                    <div class="product-price">
                    ${product.price.toFixed(2)} €
                    </div>


                    <button 
                    class="add-cart"
                    data-id="${doc.id}">

                    🛒 Dodaj v košarico

                    </button>


                </div>

            `;


            productsContainer.appendChild(card);


        });



        addCartEvents();



    } catch(error) {


        console.error(
            "Napaka pri nalaganju izdelkov:",
            error
        );


    }


}



// Začasna funkcija za gumb košarice

function addCartEvents(){


    const buttons =
    document.querySelectorAll(".add-cart");


    buttons.forEach(button => {


        button.addEventListener("click",()=>{


            const id = button.dataset.id;


            alert(
                "Izdelek dodan v košarico: " + id
            );


        });


    });


}



// Zaženi

loadProducts();
