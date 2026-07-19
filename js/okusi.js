// ==========================================
// GELATERIJA BRSTOWC
// OKUSI
// ==========================================

import { db } from "./firebase.js";

import { addToCart } from "./kosarica.js";

import {
    collection,
    getDocs,
    query,
    where
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const productsContainer = document.getElementById("productsContainer");


let products = [];


// Nalaganje izdelkov

async function loadProducts(){

    if(!productsContainer) return;


    try{


        const productsQuery = query(
            collection(db,"products"),
            where("available","==",true)
        );


        const snapshot = await getDocs(productsQuery);


        productsContainer.innerHTML = "";


        products = [];


        snapshot.forEach((doc)=>{


            const product = {

                id: doc.id,
                ...doc.data()

            };


            products.push(product);



            productsContainer.innerHTML += `

            <div class="product-card">


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
                    ${Number(product.price).toFixed(2)} €
                    </div>


                    <button 
                    class="add-cart"
                    data-id="${product.id}">

                    🛒 Dodaj v košarico

                    </button>


                </div>


            </div>

            `;


        });



        addCartEvents();



    }
    catch(error){

        console.error(
            "Napaka pri nalaganju okusov:",
            error
        );

    }

}



// Gumbi košarice

function addCartEvents(){


    const buttons =
    document.querySelectorAll(".add-cart");



    buttons.forEach(button=>{


        button.addEventListener("click",()=>{


            const id =
            button.dataset.id;



            const product =
            products.find(
                item => item.id === id
            );



            if(product){

                addToCart(product);

            }


        });


    });


}



// Zaženi

loadProducts();
