//  GENERATE HTML
// let checkOutItemDisplay = document.querySelector(".checkOutItemDisplay");
// let checkOutItem = "";
// cart.forEach((product) => {
//   checkOutItem += `hello${product.name}`;
// });
// checkOutItemDisplay.innerHTML = checkOutItem;

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
