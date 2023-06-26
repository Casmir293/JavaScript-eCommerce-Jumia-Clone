let numOfItemsDOM = document.querySelector(".numOfItemsDOM");
let totalAmount = document.querySelector(".totalAmount");

const storedCartQuantityString = localStorage.getItem("cartQuantity");
numOfItemsDOM.innerHTML = JSON.parse(storedCartQuantityString);

const storedTotalAmountString = localStorage.getItem("totalAmount");
totalAmount.innerHTML = JSON.parse(storedTotalAmountString);
