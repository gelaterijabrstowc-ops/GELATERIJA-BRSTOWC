// ==========================================
// GELATERIJA BRSTOWC
// ADMIN
// ==========================================

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    collection,
    getDocs,
    orderBy,
    query,
    doc,
    getDoc,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const adminOrders = document.getElementById("adminOrders");

// ==========================================
// NALOŽI NAROČILA
// ==========================================

async function loadOrders() {

    if (!adminOrders) return;

    try {

        const q = query(
            collection(db, "orders"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        adminOrders.innerHTML = "";

        if (snapshot.empty) {

            adminOrders.innerHTML = "<p>Ni naročil.</p>";
            return;

        }

        snapshot.forEach((orderDoc) => {

            const order = orderDoc.data();

            adminOrders.innerHTML += `

                <div class="admin-order">

                    <h3>📦 Naročilo</h3>

                    <p>👤 ${order.customerName}</p>

                    <p>📞 ${order.phone}</p>

                    <p>📍 ${order.address}</p>

                    <p>
                    🍦
                    ${order.products.map(
                        item => item.name + " x" + item.quantity
                    ).join(", ")}
                    </p>

                    <p>
                    💰 ${order.total.toFixed(2)} €
                    </p>

                </div>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ==========================================
// PREVERI ADMINA
// ==========================================

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "racun.html";
        return;

    }

    const userDoc = await getDoc(
        doc(db, "users", user.uid)
    );

    if (
        !userDoc.exists() ||
        userDoc.data().role !== "admin"
    ) {

        window.location.href = "index.html";
        return;

    }

    loadOrders();

});

// ==========================================
// DODAJ OKUS
// ==========================================

const addFlavorForm =
document.getElementById("addFlavorForm");

if (addFlavorForm) {

    addFlavorForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        try {

            const name =
                document.getElementById("flavorName").value;

            const description =
                document.getElementById("flavorDescription").value;

            const price =
                Number(document.getElementById("flavorPrice").value);

            const available =
                document.getElementById("flavorAvailable").checked;

            const category =
    document.getElementById("flavorCategory").value;

            const imageName =
                document.getElementById("flavorImage").value.trim();

            const image =
                "images/" + imageName;

await addDoc(collection(db, "products"), {

    name,
    description,
    price,
    image,
    available,
    category

});

            alert("✅ Okus uspešno dodan!");

            addFlavorForm.reset();

        } catch (error) {

            console.error(error);

            alert("Napaka pri dodajanju okusa.");

        }

    });

}
