// ==========================================
// GELATERIJA BRSTOWC
// BLAGAJNA
// ==========================================


import { db, auth } from "./firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";



const itemsContainer =
document.getElementById("checkoutItems");


const totalElement =
document.getElementById("checkoutTotal");


const form =
document.getElementById("checkoutForm");



let currentUser = null;



// prijavljen uporabnik

onAuthStateChanged(auth,(user)=>{

    currentUser = user;

});




// košarica

const cart =
JSON.parse(
    localStorage.getItem("cart")
) || [];





function loadCheckout(){


    if(!itemsContainer) return;


    itemsContainer.innerHTML="";


    let total = 0;



    cart.forEach(item=>{


        total += item.price * item.quantity;



        itemsContainer.innerHTML += `

        <p>

        ${item.name}

        x ${item.quantity}

        -

        ${(item.price * item.quantity).toFixed(2)} €

        </p>

        `;


    });



    totalElement.textContent =
    total.toFixed(2)+" €";


}



loadCheckout();






// oddaja naročila

form.addEventListener("submit", async(e)=>{


    e.preventDefault();



    if(cart.length === 0){

        alert("Košarica je prazna.");

        return;

    }



    const name =
    document.getElementById("customerName").value;


    const address =
    document.getElementById("customerAddress").value;


    const phone =
    document.getElementById("customerPhone").value;



    let total = 0;


    cart.forEach(item=>{

        total += item.price * item.quantity;

    });





    try{


        await addDoc(
            collection(db,"orders"),
            {

                userId:
                currentUser ? currentUser.uid : null,


                customerName:name,

                address:address,

                phone:phone,


                products:cart,


                total:total,


                createdAt:
                serverTimestamp()

            }

        );



        localStorage.removeItem("cart");



        window.location.href =
        "uspesno.html";



    }
    catch(error){


        console.error(error);


        alert(
        "Napaka pri oddaji naročila."
        );


    }


});
