// ==========================================
// GELATERIJA BRSTOWC
// FIREBASE
// ==========================================

// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyAuENCfSQwwdO2X1TJSeeFMamPhY1UjQDY",

    authDomain: "gelaterija-brstowc.firebaseapp.com",

    projectId: "gelaterija-brstowc",

    storageBucket: "gelaterija-brstowc.firebasestorage.app",

    messagingSenderId: "827480583451",

    appId: "1:827480583451:web:b4317fdf62aa0f024b37be"

};


// ==========================================
// INITIALIZE
// ==========================================

const app = initializeApp(firebaseConfig);


// ==========================================
// SERVICES
// ==========================================

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ==========================================
// EXPORT
// ==========================================

export {

    auth,

    db,

    storage

};
