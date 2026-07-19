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

    } 
    else {

        cart.push({

            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: 1

        });

    }


    saveCart(cart);

    updateCartCount();

    alert(product.name + " je dodan v košarico");

}



// Števec košarice

export function updateCartCount(){


    const cartCount =
    document.getElementById("cartCount");


    if(!cartCount) return;


    const cart = getCart();


    let count = 0;


    cart.forEach(item=>{

        count += item.quantity;

    });


    cartCount.textContent = count;

}



// Prikaz košarice

export function loadCart(){


    const container =
    document.getElementById("cartContainer");


    const totalElement =
    document.getElementById("cartTotal");


    if(!container) return;


    const cart = getCart();


    container.innerHTML = "";


    let total = 0;



    if(cart.length === 0){

        container.innerHTML =
        "<p>Košarica je prazna.</p>";

        totalElement.textContent="0 €";

        return;

    }



    cart.forEach(item=>{


        total += item.price * item.quantity;



        container.innerHTML += `


        <div class="cart-item">


            <img src="${item.image}">


            <div>


                <h3>
                ${item.name}
                </h3>


                <p>
                Cena:
                ${item.price.toFixed(2)} €
                </p>


                <div class="quantity">


                    <button 
                    class="minus"
                    data-id="${item.id}">
                    -
                    </button>


                    <span>
                    ${item.quantity}
                    </span>


                    <button 
                    class="plus"
                    data-id="${item.id}">
                    +
                    </button>


                </div>



                <button
                class="remove"
                data-id="${item.id}">
                
                ❌ Odstrani

                </button>


            </div>


        </div>


        `;


    });



    totalElement.textContent =
    total.toFixed(2)+" €";



    cartButtons();

}



// Gumbi + - odstrani

function cartButtons(){


    document.querySelectorAll(".plus")
    .forEach(button=>{


        button.onclick=()=>{


            changeQuantity(
                button.dataset.id,
                1
            );


        };


    });



    document.querySelectorAll(".minus")
    .forEach(button=>{


        button.onclick=()=>{


            changeQuantity(
                button.dataset.id,
                -1
            );


        };


    });



    document.querySelectorAll(".remove")
    .forEach(button=>{


        button.onclick=()=>{


            removeItem(
                button.dataset.id
            );


        };


    });


}



// Sprememba količine

function changeQuantity(id,change){


    let cart=getCart();


    const item =
    cart.find(
        product=>product.id===id
    );


    if(item){


        item.quantity += change;


        if(item.quantity <=0){

            cart =
            cart.filter(
                product=>product.id!==id
            );

        }

    }


    saveCart(cart);


    loadCart();

    updateCartCount();

}



// Odstrani izdelek

function removeItem(id){


    let cart=getCart();


    cart =
    cart.filter(
        item=>item.id!==id
    );


    saveCart(cart);


    loadCart();

    updateCartCount();

}



// Ko se stran odpre

loadCart();

updateCartCount();
