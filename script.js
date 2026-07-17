/* ==========================================
   GELATERIJA BRSTOWC
   SCRIPT.JS - 1. DEL
========================================== */

/* ==========================
   LOADER
========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }

    }, 1000);

});

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

/* ==========================
   HAMBURGER MENI
========================== */

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav ul");

if (hamburger && navMenu) {

    hamburger.addEventListener("click", () => {

        if (
            navMenu.style.display === "flex"
        ) {

            navMenu.style.display = "none";

        } else {

            navMenu.style.display = "flex";
            navMenu.style.flexDirection = "column";

        }

    });

}

/* ==========================
   ZAPIRANJE MENIJA
========================== */

document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 900) {

            navMenu.style.display = "none";

        }

    });

});

/* ==========================
   POZDRAV
========================== */

console.log("🍦 Dobrodošli v Gelateriji Brstowc!");

/* ==========================================
   GELATERIJA BRSTOWC
   SCRIPT.JS - 2. DEL
========================================== */

/* ==========================
   GUMB "NAZAJ NA VRH"
========================== */

const topButton = document.createElement("button");

topButton.id = "topButton";
topButton.innerHTML = "⬆";

document.body.appendChild(topButton);

topButton.style.position = "fixed";
topButton.style.right = "25px";
topButton.style.bottom = "20px";
topButton.style.width = "55px";
topButton.style.height = "55px";
topButton.style.borderRadius = "50%";
topButton.style.border = "none";
topButton.style.background = "#ff4d6d";
topButton.style.color = "white";
topButton.style.fontSize = "22px";
topButton.style.cursor = "pointer";
topButton.style.display = "none";
topButton.style.zIndex = "9999";

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        topButton.style.display = "block";

    } else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================
   GLADKO DRSENJE
========================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ==========================
   ANIMACIJA KARTIC
========================== */

const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";
            entry.target.style.transform="translateY(0px)";

        }

    });

});

cards.forEach(card=>{

    card.style.opacity="0";
    card.style.transform="translateY(40px)";
    card.style.transition="0.7s";

    observer.observe(card);

});

/* ==========================
   LIGHTBOX GALERIJA
========================== */

const images = document.querySelectorAll(".gallery img");

const lightbox = document.createElement("div");

lightbox.style.position="fixed";
lightbox.style.top="0";
lightbox.style.left="0";
lightbox.style.width="100%";
lightbox.style.height="100%";
lightbox.style.background="rgba(0,0,0,.9)";
lightbox.style.display="none";
lightbox.style.justifyContent="center";
lightbox.style.alignItems="center";
lightbox.style.cursor="pointer";
lightbox.style.zIndex="10000";

const lightboxImg=document.createElement("img");

lightboxImg.style.maxWidth="90%";
lightboxImg.style.maxHeight="90%";
lightboxImg.style.borderRadius="15px";

lightbox.appendChild(lightboxImg);

document.body.appendChild(lightbox);

images.forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.style.display="flex";

        lightboxImg.src=img.src;

    });

});

lightbox.addEventListener("click",()=>{

    lightbox.style.display="none";

});

/* ==========================================
   GELATERIJA BRSTOWC
   SCRIPT.JS - 3. DEL
========================================== */

/* ==========================
   KOŠARICA
========================== */

let cart = [];

function addIceCream(name){

    cart.push(name);

    updateCart();

}

function updateCart(){

    const cartList = document.getElementById("cart");

    if(!cartList) return;

    cartList.innerHTML = "";

    cart.forEach((item,index)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            ${item}
            <button onclick="removeIceCream(${index})">
                ❌
            </button>
        `;

        cartList.appendChild(li);

    });

}

function removeIceCream(index){

    cart.splice(index,1);

    updateCart();

}

function finishOrder(){

    if(cart.length===0){

        alert("Košarica je prazna.");

        return;

    }

    alert(
`Hvala za naročilo!

Naročili ste:

${cart.join("\n")}

Gelaterija Brstowc 🍦`
    );

    cart=[];

    updateCart();

}

/* ==========================
   ŠTEVEC OBISKOVALCEV
========================== */

const visitors =
    Math.floor(Math.random()*500)+500;

console.log("Današnji obiskovalci:",visitors);

/* ==========================
   KONTAKTNI OBRAZEC
========================== */

const form = document.querySelector("form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

alert(
"Hvala za vaše sporočilo!\nOdgovorili vam bomo čim prej."
);

form.reset();

});

}

/* ==========================
   LETO V FOOTERJU
========================== */

const footer = document.querySelector("footer p");

if(footer){

footer.innerHTML =
`© ${new Date().getFullYear()} Gelaterija Brstowc`;

}

/* ==========================
   KONČNO SPOROČILO
========================== */

console.log("🍓 Gelaterija Brstowc je pripravljena!");
