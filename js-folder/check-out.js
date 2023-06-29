let storedCartArrayString = localStorage.getItem("cart");
newCart = JSON.parse(storedCartArrayString);
console.log(newCart);
let cartIsEmpty = document.querySelector(".cartIsEmpty");
let reviewOrder = document.querySelector(".review-order");
reviewOrder.style.display = "None";
clearCart = document.querySelector(".clear-cart");
clearCart.style.display = "None";

//  GENERATE HTML
let checkOutItemDisplay = document.querySelector(".checkOutItemDisplay");
let checkOutItem = "";

newCart.forEach((product, index) => {
  checkOutItem += `
  <div
  class="border border-dark rounded p-1 mb-5 lh-lg"
>
  <img
    src="${product.image}"
    class="w-100"
    style="height: 300px; object-fit: cover;"
    alt="${product.name}"
  />
  <b class="px-2">${product.name}</b>
  <b>&#8358; <span>12500</span></b>
  <p class="px-2">Quantity: <span>${product.quantity}</span></p>
  <div class="d-flex justify-content-evenly">
    <p class="btn btn-outline-dark">Update</p>
    <p class="delete-button btn btn-outline-dark" data-index="${index}">Delete</p>
  </div>
  <div class="update-cancel">
    <input type="number" min="1" max="99" class="px-2 ms-5 mb-3" />
    <span class="mx-2 text-primary">Update</span>
    <span class="text-primary">Cancel</span>
  </div>
</div>`;
});

checkOutItemDisplay.innerHTML = checkOutItem;

//  Delete Button
let deleteBtn = document.querySelectorAll(".delete-button");

deleteBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    // retrieve the index from the data-index attribute
    const index = event.target.dataset.index;
    // remove the product from the newCart array
    newCart.splice(index, 1);
    // update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newCart));
    // reload the page to reflect the changes
    location.reload();
  });
});

if (newCart.length === 0) {
  checkOutItemDisplay.style.display = "None";
  cartIsEmpty.style.display = "Block";
} else {
  checkOutItemDisplay.style.display = "Block";
  cartIsEmpty.style.display = "None";
  reviewOrder.style.display = "Block";
  clearCart.style.display = "Block";
}

//  Display Stored Item Quantity
let topNumOfItemsDOM = document.querySelector(".topNumOfItemsDOM");
let numOfItemsDOM = document.querySelector(".numOfItemsDOM");
const storedCartQuantityString = localStorage.getItem("cartQuantity");
topNumOfItemsDOM.innerHTML = JSON.parse(storedCartQuantityString);
numOfItemsDOM.innerHTML = JSON.parse(storedCartQuantityString);

//  Display total money in cart
let totalAmount = document.querySelector(".totalAmount");
const storedTotalAmountString = localStorage.getItem("totalAmount");
let storedTotalAmount = JSON.parse(storedTotalAmountString);
let totalAmountFixed = storedTotalAmount.toFixed(2);
let formattedTotalAmount = totalAmountFixed.replace(
  /\B(?=(\d{3})+(?!\d))/g,
  ","
);
totalAmount.innerHTML = formattedTotalAmount;

//  Shipping & Handling
let shipping = document.querySelector(".shipping");
let paidShipping = JSON.parse(storedTotalAmountString);
let shippingFee = 3500;
if (paidShipping < 100000) {
  shipping.innerHTML = `${shippingFee.toLocaleString("en-US")}.00`;
}

//  Total Before Tax
let beforeTax = document.querySelector(".beforeTax");
let newTotalAmountFixed = Number(totalAmountFixed);
let calcBeforeTax;
if (paidShipping < 100000) {
  calcBeforeTax = shippingFee + newTotalAmountFixed;
} else {
  calcBeforeTax = newTotalAmountFixed;
}
let calcBeforeTaxFixed = calcBeforeTax.toFixed(2);
let formattedBeforeTax = calcBeforeTaxFixed.replace(
  /\B(?=(\d{3})+(?!\d))/g,
  ","
);
beforeTax.innerHTML = formattedBeforeTax;

//  Total After Tax
let tax = document.querySelector(".tax");
let estimatedTax = calcBeforeTax * (25 / 1000);
let calcAfterTaxFixed = estimatedTax.toFixed(2);
let formattedAfterTax = calcAfterTaxFixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
tax.innerHTML = formattedAfterTax;

//  Final Amount
let finalAmount = document.querySelector(".final-amount");
let payableAmount = calcBeforeTax + estimatedTax;
let payableAmountFixed = payableAmount.toFixed(2);
let formattedpayableAmount = payableAmountFixed.replace(
  /\B(?=(\d{3})+(?!\d))/g,
  ","
);
finalAmount.innerHTML = formattedpayableAmount;

//  Clear Local Storage
clearCart.addEventListener(
  "click",
  (clearCartFunction = () => {
    localStorage.clear();
    location.reload();
  })
);
