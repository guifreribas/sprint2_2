// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: "cooking oil",
        price: 10.5,
        type: "grocery",
        offer: {
            number: 3,
            percent: 20,
        },
    },
    {
        id: 2,
        name: "Pasta",
        price: 6.25,
        type: "grocery",
    },
    {
        id: 3,
        name: "Instant cupcake mixture",
        price: 5,
        type: "grocery",
        offer: {
            number: 10,
            percent: 30,
        },
    },
    {
        id: 4,
        name: "All-in-one",
        price: 260,
        type: "beauty",
    },
    {
        id: 5,
        name: "Zero Make-up Kit",
        price: 20.5,
        type: "beauty",
    },
    {
        id: 6,
        name: "Lip Tints",
        price: 12.75,
        type: "beauty",
    },
    {
        id: 7,
        name: "Lawn Dress",
        price: 15,
        type: "clothes",
    },
    {
        id: 8,
        name: "Lawn-Chiffon Combo",
        price: 19.99,
        type: "clothes",
    },
    {
        id: 9,
        name: "Toddler Frock",
        price: 9.99,
        type: "clothes",
    },
];
const CART_COUNT_ACTIONS = {
    ADD: "ADD",
    SUBSTRACT: "SUBSTRACT",
    RESET: "RESET",
};
// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;
let cartElements = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array
    for (const product of products) {
        if (product.id === id) {
            const productInCart = cart.find((item) => item.id === product.id);
            if (!productInCart) {
                const productToAddToCart = { ...product };
                productToAddToCart.quantity = 1;
                cart.push(productToAddToCart);
            } else {
                productInCart.quantity++;
            }
            updateCartCount(CART_COUNT_ACTIONS.ADD);
            break;
        }
    }
}

// Exercise 2
function cleanCart() {
    cart.length = 0;
    updateCartCount(CART_COUNT_ACTIONS.RESET);

    //Delete all cart elements TODO
    const $bodyTable = document.getElementById("cart_list");
    const $totalResult = document.getElementById("total_price");
    $bodyTable.innerHTML = "";
    $totalResult.innerText = "0.00";
}

// Exercise 3
function calculateTotal(cart) {
    // Calculate total price of the cart using the "cartList" array
    total = cart.reduce((acc, item) => {
        let totalVal = 0;
        item.hasOwnProperty("subtotalWithDiscount") ? (totalVal = item.subtotalWithDiscount) : (totalVal = item.price * item.quantity);
        return acc + totalVal;
    }, 0);
}

// Exercise 4
function applyPromotionsCart(cartElements) {
    // Apply promotions to each item in the array "cart"
    cartElements.forEach((item, idx) => {
        if (item.hasOwnProperty("offer")) {
            if (item.quantity >= item.offer.number) {
                const total = item.price * item.quantity;
                const subtotalWithDiscount = total - (total * item.offer.percent) / 100;
                cartElements[idx].subtotalWithDiscount = subtotalWithDiscount;
            }
        }
    });
    return cartElements;
}

// Exercise 5
function printCart(cart) {
    // Fill the shopping cart modal manipulating the shopping cart dom
    const list = [];
    const $bodyTable = document.getElementById("cart_list");
    const $totalResult = document.getElementById("total_price");
    $bodyTable.innerHTML = null;
    cart.forEach((item) => {
        const itemTotal = item.hasOwnProperty("subtotalWithDiscount") ? (totalVal = item.subtotalWithDiscount) : (totalVal = item.price * item.quantity);
        const itemChild = `<tr>
								<th scope="row" >${item.name}</th>
								<td>$${item.price}</td>
								<td>${item.quantity}</td>
								<td>$${itemTotal.toFixed(2)}</td>
                                <td><button onclick="removeFromCart('${item.id}')">Eliminar</button></td>
							</tr>`;
        list.push(itemChild);
    });
    $bodyTable.innerHTML = list.join("");
    $totalResult.innerText = total.toFixed(2);
}

// ** Nivell II **

// Exercise 7
function removeFromCart(itemId) {
    const id = Number(itemId);
    const oldCart = [...cart];
    cart = oldCart
        .map((item) => {
            if (item.id !== id) return item;
            if (item.id === id && item.quantity > 1) {
                item.quantity -= 1;
                updateCartCount(CART_COUNT_ACTIONS.SUBSTRACT);
                if (item.hasOwnProperty("subtotalWithDiscount") && item.quantity < item.offer.number) delete item.subtotalWithDiscount;
                return { ...item, quantity: item.quantity };
            }
            return null;
        })
        .filter((item) => item);
    applyPromotionsCart(cart);
    calculateTotal(cart);
    printCart(cart);
}

function open_modal() {
    applyPromotionsCart(cart);
    calculateTotal(cart);
    printCart(cart);
}

function updateCartCount(action) {
    if (CART_COUNT_ACTIONS.ADD === action) cartElements++;
    if (CART_COUNT_ACTIONS.SUBSTRACT === action) cartElements--;
    if (CART_COUNT_ACTIONS.RESET === action) cartElements = 0;

    const $totalCart = document.getElementById("count_product");
    $totalCart.innerText = cartElements;
}
