// ==========================================
// GELATERIJA BRSTOWC
// NAVBAR
// ==========================================

// ---------- DARK MODE ----------

const darkButton = document.getElementById("darkMode");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

if (darkButton) {

    darkButton.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            localStorage.setItem("theme", "dark");

            darkButton.textContent = "☀️";

        } else {

            localStorage.setItem("theme", "light");

            darkButton.textContent = "🌙";

        }

    });

}

// Nastavi pravilno ikono ob nalaganju strani

if (darkButton && document.body.classList.contains("dark")) {

    darkButton.textContent = "☀️";

}

// ---------- HAMBURGER ----------

const hamburger = document.querySelector(".hamburger");

const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("show");

    });

}
