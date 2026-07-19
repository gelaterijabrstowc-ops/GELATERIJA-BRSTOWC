import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// -------------------- REGISTRACIJA --------------------

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("registerName").value.trim();
        const email = document.getElementById("registerEmail").value.trim();
        const password = document.getElementById("registerPassword").value;
        const password2 = document.getElementById("registerPassword2").value;

        if (password !== password2) {
            alert("Gesli se ne ujemata.");
            return;
        }

        try {

            const userCredential =
                await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", userCredential.user.uid), {

                ime: name,
                email: email,
                role: "user",
                createdAt: serverTimestamp()

            });

            alert("Račun je bil uspešno ustvarjen.");

            registerForm.reset();

        } catch (error) {

            alert(error.message);

        }

    });

}


// -------------------- PRIJAVA --------------------

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = "index.html";

        } catch (error) {

            alert("Napačen e-poštni naslov ali geslo.");

        }

    });

}


// -------------------- ODJAVA --------------------

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        await signOut(auth);

        window.location.reload();

    });

}
