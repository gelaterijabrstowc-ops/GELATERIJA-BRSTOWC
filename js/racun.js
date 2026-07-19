import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginBox = document.querySelector(".login-box");
const registerBox = document.querySelector(".register-box");

const userPanel = document.getElementById("userPanel");

const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");

const logoutButton = document.getElementById("logoutButton");

onAuthStateChanged(auth, async (user) => {

    if (user) {

        if (loginBox) loginBox.style.display = "none";
        if (registerBox) registerBox.style.display = "none";

        userPanel.style.display = "block";

        const userRef = doc(db, "users", user.uid);

        const snap = await getDoc(userRef);

        if (snap.exists()) {

            const data = snap.data();

            userName.textContent = "👤 " + data.ime;
            userEmail.textContent = "📧 " + data.email;

        } else {

            userName.textContent = "👤 " + user.email;
            userEmail.textContent = "";

        }

    } else {

        if (loginBox) loginBox.style.display = "block";
        if (registerBox) registerBox.style.display = "block";

        userPanel.style.display = "none";

    }

});

import {
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


if(logoutButton){

    logoutButton.addEventListener("click",()=>{

        signOut(auth);

    });

}
