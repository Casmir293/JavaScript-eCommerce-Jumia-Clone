//  DECLERE VARIABLES
let storedCartArrayString = localStorage.getItem("cart");
let newCart = [];
if (storedCartArrayString) {
  newCart = JSON.parse(storedCartArrayString);
}
let cartIsEmpty = document.querySelector(".cartIsEmpty");
let reviewOrder = document.querySelector(".review-order");
reviewOrder.style.display = "None";
clearCart = document.querySelector(".clear-cart");
clearCart.style.display = "None";

//  GENERATE HTML
let checkOutItemDisplay = document.querySelector(".checkOutItemDisplay");
let checkOutItem = "";

if (newCart && newCart.length > 0) {
  newCart.forEach((product, index) => {
    const updateCancelId = `updateCancel_${index}`;
    checkOutItem += `
  <div
  class="border border-secondary rounded p-1 mb-5 lh-lg shadow-lg"
>
<div class='row'><div class='col-lg'><img
    src="${product.image}"
    class="w-100"
    style="height: 300px; object-fit: cover;"
    alt="${product.name}"
  /></div>
  <div class='col-lg mt-lg-5'>
  <b class="px-2">${product.name}</b>
  <b>&#8358; <span>${product.priceCent.toLocaleString("en-US")}</span></b>
  <p class="px-2">Quantity: <span>${product.quantity}</span></p>
  <div class="update-delete-btn mt-4">
    <p class="parent-update btn btn-outline-dark me-2">Update</p>
    <p class="delete-button btn btn-outline-dark" data-index="${index}">Delete</p>
  </div>
  <div class="update-cancel" id="updateCancel_${index}">
    <input type="number" min="1" max="99" class="updateQuantityValue px-2  mb-3" value="${
      product.quantity
    }" />
    <span class="updateQuantity mx-2 text-primary">Update</span>
    <span class="cancel-update text-primary">Cancel</span>
  </div></div></div>
</div>`;
  });
}
checkOutItemDisplay.innerHTML = checkOutItem;

// Get the scroll position from localStorage if available
var scrollPosition = localStorage.getItem("scrollPosition");

// Set the scroll position of the .scroll-vertical div
if (scrollPosition) {
  document.querySelector(".scroll-vertical").scrollTop = scrollPosition;
}

// Save the scroll position in localStorage when the page is unloaded
window.addEventListener("beforeunload", function () {
  localStorage.setItem(
    "scrollPosition",
    document.querySelector(".scroll-vertical").scrollTop
  );
});

// PRODUCT UPDATING FEATURE
let updateCancelList = document.querySelectorAll(".update-cancel");
updateCancelList.forEach((updateCancel) => {
  updateCancel.style.display = "none";
});

let parentUpdateList = document.querySelectorAll(".parent-update");
parentUpdateList.forEach((button, index) => {
  button.addEventListener("click", () => {
    // Unique ID for updateCancel div
    const updateCancelId = `#updateCancel_${index}`;
    const updateCancelDiv = document.querySelector(updateCancelId);
    updateCancelDiv.style.display = "block";
  });

  // Add event listener to the "Cancel" button
  const updateCancelDiv = document.querySelector(`#updateCancel_${index}`);
  const cancelUpdate = updateCancelDiv.querySelector(".cancel-update");
  cancelUpdate.addEventListener("click", () => {
    updateCancelDiv.style.display = "none";
  });
});

// Function to update cartQuantity and totalAmount in localStorage
function updateCartInfo() {
  // Calculate the updated cartQuantity
  let updatedCartQuantity = newCart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  // Calculate the updated totalAmount
  let updatedTotalAmount = newCart.reduce(
    (acc, product) => acc + product.quantity * product.priceCent,
    0
  );

  // Update cartQuantity in localStorage
  localStorage.setItem("cartQuantity", JSON.stringify(updatedCartQuantity));
  // Update totalAmount in localStorage
  localStorage.setItem("totalAmount", JSON.stringify(updatedTotalAmount));

  // Update the displayed values on the page
  topNumOfItemsDOM.innerHTML = updatedCartQuantity;
  numOfItemsDOM.innerHTML = updatedCartQuantity;

  let totalAmountFixed = updatedTotalAmount.toFixed(2);
  let formattedTotalAmount = totalAmountFixed.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );
  totalAmount.innerHTML = formattedTotalAmount;
}

// Function to update the quantity of a product
function updateQuantity(index, quantity) {
  // Update the quantity in the newCart array
  newCart[index].quantity = quantity;
  // Update the cart in local storage
  localStorage.setItem("cart", JSON.stringify(newCart));
  // Update cartQuantity and totalAmount in localStorage
  updateCartInfo();
}

// Event listener for the "Update" button
let updateBtn = document.querySelectorAll(".updateQuantity");
let updateQuantityValue = document.querySelectorAll(".updateQuantityValue");

updateBtn.forEach((button, index) => {
  button.addEventListener("click", () => {
    const quantity = parseInt(updateQuantityValue[index].value);
    if (!isNaN(quantity) && quantity >= 1 && quantity <= 99) {
      updateQuantity(index, quantity);
      // Unique ID for updateCancel div
      const updateCancelId = `#updateCancel_${index}`;
      const updateCancelDiv = document.querySelector(updateCancelId);
      updateCancelDiv.style.display = "None";
      location.reload();
    } else {
      alert("Invalid quantity! Please enter a number between 1 and 99.");
    }
  });
});

//  Delete Button
let deleteBtn = document.querySelectorAll(".delete-button");

deleteBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    // retrieve the index from the data-index attribute
    const index = event.target.dataset.index;
    // remove the product from the newCart array
    newCart.splice(index, 1);
    // Update cartQuantity and totalAmount in localStorage
    updateCartInfo();
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
//let storedTotalAmount = JSON.parse(storedTotalAmountString);
let totalAmountFixed = storedTotalAmountString
  ? parseFloat(storedTotalAmountString).toFixed(2)
  : 0;

let formattedTotalAmount = totalAmountFixed
  .toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

totalAmount.innerHTML = formattedTotalAmount;

//  Total Before Tax
let paidShipping = JSON.parse(storedTotalAmountString);
let shipping = document.querySelector(".shipping");
let beforeTax = document.querySelector(".beforeTax");
let newTotalAmountFixed = Number(totalAmountFixed);
let shippingFee = 3500;
let calcBeforeTax;
if (paidShipping > 0 && paidShipping < 100000) {
  calcBeforeTax = shippingFee + newTotalAmountFixed;
  shipping.innerHTML = `${shippingFee.toLocaleString("en-US")}.00`;
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

// Place Order Btn
let placeOrderBtn = document.querySelector(".place-order-btn");
placeOrderBtn.addEventListener("click", () => {
  if (newCart.length === 0) {
    alert("Your Cart is Empty");
  } else {
    let myModalDisplay = document.querySelector(".myModalDisplay");
    let myModal = `
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Payment Options</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <span class="spinner-border text-warning"></span><span class="mx-5">Coming Soon!</span>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>`;
    myModalDisplay.innerHTML = myModal;
  }
});
