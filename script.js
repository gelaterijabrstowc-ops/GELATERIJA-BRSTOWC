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

// Kontaktni obrazec
const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Hvala za vaše sporočilo! 🍦");

        form.reset();

    });
}

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
