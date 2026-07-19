// ==========================================
// GELATERIJA BRSTOWC
// KOŠARICA
// ==========================================


function getCart(){

    return JSON.parse(
        localStorage.getItem("cart")
    ) || [];

}



function saveCart(cart){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}



// Dodaj izdelek

export function addToCart(product){


    let cart = getCart();


    const existing = cart.find(
        item => item.id === product.id
    );


    if(existing){

        existing.quantity++;

    } else {


        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity:1

        });


    }


    saveCart(cart);


    updateCartCount();


    alert(
        product.name + " je dodan v košarico"
    );

}



// Števec košarice

export function updateCartCount(){


    const cartCount =
    document.getElementById("cartCount");


    if(!cartCount) return;


    const cart = getCart();


    let total = 0;


    cart.forEach(item=>{

        total += item.quantity;

    });


    cartCount.textContent = total;


}



// Prikaži košarico

export function loadCart(){


    const container =
    document.getElementById("cartContainer");


    const totalElement =
    document.getElementById("cartTotal");


    if(!container) return;


    const cart = getCart();


    container.innerHTML="";


    let total = 0;



    if(cart.length === 0){

        container.innerHTML =
        "<p>Košarica je prazna.</p>";

        totalElement.textContent =
        "0 €";

        return;

    }



    cart.forEach(item=>{


        total += item.price * item.quantity;



        container.innerHTML += `

        <div class="cart-item">


            <img src="${item.image}">


            <div>

                <h3>${item.name}</h3>

                <p>
                ${item.price.toFixed(2)} €
                </p>


                <p>
                Količina: ${item.quantity}
                </p>


            </div>


        </div>

        `;


    });



    totalElement.textContent =
    total.toFixed(2) + " €";


}



// Zaženi števec

updateCartCount();
