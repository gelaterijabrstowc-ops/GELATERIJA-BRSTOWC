// ===============================
// GELATERIJA BRSTOWC
// script.js
// ===============================

// Mobilni meni
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        if (navLinks.style.display === "flex") {
            navLinks.style.display = "none";
        } else {
            navLinks.style.display = "flex";
            navLinks.style.flexDirection = "column";
        }
    });
}

// Zapri meni po kliku na povezavo
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            navLinks.style.display = "none";
        }
    });
});

// Gladko drsenje
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Animacija kartic
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

});

cards.forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.7s";

    observer.observe(card);

});

console.log("🍦 Gelaterija Brstowc uspešno naložena!");

/* ==========================
   TEMNI NAČIN
========================== */

const darkModeButton = document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

if (darkModeButton) {

    darkModeButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");

        }

    });

}

// ==========================
// EMAILJS
// ==========================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(e){

        e.preventDefault();

        emailjs.sendForm(
            "service_80s7syb",
            "template_6xszds6",
            this
        ).then(() => {

            const data = {
                ime: contactForm.ime.value,
                email: contactForm.email.value,
                sporocilo: contactForm.sporocilo.value
            };

            return emailjs.send(
                "service_80s7syb",
                "template_bm09sea",
                data
            );

        }).then(() => {

            alert("🍦 Hvala! Vaše sporočilo je bilo uspešno poslano.");

            contactForm.reset();

        }).catch((error) => {

            console.error(error);

            alert("❌ Prišlo je do napake pri pošiljanju.");

        });

    });

}

/* ===========================
   FIREBASE - MNENJA
=========================== */

// Firebase povezava
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// TVOJI FIREBASE PODATKI
const firebaseConfig = {
    apiKey: "TVOJ_API_KEY",
    authDomain: "TVOJ_PROJEKT.firebaseapp.com",
    projectId: "TVOJ_PROJECT_ID",
    storageBucket: "TVOJ_BUCKET",
    messagingSenderId: "TVOJ_SENDER_ID",
    appId: "TVOJ_APP_ID"
};


// Zaženi Firebase
const app = initializeApp(firebaseConfig);


// Firestore baza
const db = getFirestore(app);



/* ===========================
   ZVEZDICE
=========================== */

let selectedStars = 0;

const stars = document.querySelectorAll(".star");


stars.forEach((star)=>{

    star.addEventListener("click",()=>{

        selectedStars = star.dataset.value;

        stars.forEach((s)=>{

            if(s.dataset.value <= selectedStars){
                s.classList.add("active");
            }
            else{
                s.classList.remove("active");
            }

        });

    });

});



/* ===========================
   SHRANI MNENJE
=========================== */

const sendReview = document.getElementById("sendReview");


sendReview.addEventListener("click", async ()=>{


    const name = document.getElementById("reviewName").value;

    const text = document.getElementById("reviewText").value;



    if(name === "" || text === "" || selectedStars === 0){

        alert("Prosimo izpolni vse podatke in izberi zvezdice.");

        return;

    }



    try{


        await addDoc(collection(db,"reviews"),{


            name:name,

            text:text,

            stars:selectedStars,

            date:serverTimestamp()


        });



        alert("Hvala za tvoje mnenje! ❤️");



        document.getElementById("reviewName").value="";
        document.getElementById("reviewText").value="";


        selectedStars=0;


        stars.forEach(s=>{
            s.classList.remove("active");
        });


    }


    catch(error){

        console.log(error);

        alert("Napaka pri shranjevanju.");

    }


});





/* ===========================
   PRIKAZ MNENJ
=========================== */


const reviewsContainer =
document.getElementById("reviewsContainer");



const reviewsQuery = query(
    collection(db,"reviews"),
    orderBy("date","desc")
);



onSnapshot(reviewsQuery,(snapshot)=>{


    reviewsContainer.innerHTML="";



    snapshot.forEach((doc)=>{


        const review = doc.data();



        let starsHTML="";


        for(let i=0;i<review.stars;i++){

            starsHTML += "⭐";

        }



        reviewsContainer.innerHTML += `


        <div class="review-card">


            <h3>${review.name}</h3>


            <div class="review-stars">
                ${starsHTML}
            </div>


            <p>
                ${review.text}
            </p>


            <div class="review-date">
                ${review.date ? 
                review.date.toDate().toLocaleDateString()
                :
                ""}
            </div>


        </div>


        `;


    });


});
