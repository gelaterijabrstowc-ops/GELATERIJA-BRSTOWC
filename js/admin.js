// ==========================================
// GELATERIJA BRSTOWC
// ADMIN - NAROČILA
// ==========================================

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

import {
    addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { storage } from "./firebase.js";

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

onAuthStateChanged(auth, async (user)=>{


    if(!user){

        alert("Dostop zavrnjen.");

        window.location.href="racun.html";

        return;

    }



    const userDoc = await getDoc(
        doc(db,"users",user.uid)
    );



    if(
        !userDoc.exists() ||
        userDoc.data().role !== "admin"
    ){

        alert("Nimaš dovoljenja za admin stran.");

        window.location.href="index.html";

        return;

    }



    loadOrders();


});

// ==========================================
// DODAJ NOV OKUS
// ==========================================

const addFlavorForm = document.getElementById("addFlavorForm");

if (addFlavorForm) {

    addFlavorForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        try {

            const name = document.getElementById("flavorName").value;
            const description = document.getElementById("flavorDescription").value;
            const price = Number(document.getElementById("flavorPrice").value);

            const available =
                document.getElementById("flavorAvailable").checked;

            const file =
                document.getElementById("flavorImage").files[0];

            if (!file) {

                alert("Izberi sliko.");
                return;

            }

            // Upload slike

            const imageRef = ref(
                storage,
                `flavors/${Date.now()}_${file.name}`
            );

            await uploadBytes(imageRef, file);

            const imageUrl =
                await getDownloadURL(imageRef);

            // Shrani okus

            await addDoc(collection(db, "flavors"), {

                name,
                description,
                price,
                image: imageUrl,
                available,
                createdAt: new Date()

            });

            alert("✅ Okus uspešno dodan!");

            addFlavorForm.reset();

        } catch (error) {

            console.error(error);

            alert("Napaka pri dodajanju okusa.");

        }

    });

}

const imageName =
document.getElementById("flavorImage").value.trim();

const imageUrl =
"images/" + imageName;
