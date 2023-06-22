newDisplay = document.querySelector(".tablet-border");
let productsHTML = "";

//  GENERATE-THE-HTML

products.forEach((product) => {
  productsHTML += `<div class="my-product col-sm-4 col-lg-2">
    <img
      src="${product.image}"
      class="product-image w-100"
    />
    <p class="product-name my-2">${product.name}</p>
    <div class="d-flex align-items-center">
      <img
        src="images/ratings/rating-${product.rating.star * 10}.png"
        loading="lazy"
        class="rate-star h-auto me-3"
      /><span class="text-primary">${product.rating.rateValue}</span>
    </div>
    <p class="my-1">&#8358; ${product.priceCent}</p>
    <div>
      <input
        type="number"
        value="1"
        min="1"
        max="99"
        class="select-quantity-${product.id} px-1"
      />
    </div>
    <button
      class="add-to-cart js-add-to-cart text-light my-4 mx-auto mx-sm-0 d-flex
      px-5 py-2 rounded shadow border-1" data-product-id="${product.id}"
    >
      Add to Cart
    </button>
    <div
      class="mobile-border border-secondary border-1 border-bottom mb-4"
    ></div>
  </div>`;
});

newDisplay.innerHTML = productsHTML;

let jsAddToCart = document.querySelectorAll(".js-add-to-cart");
let itemNotification = document.querySelector(".item-notification");

//  ADD-TO-CART-BUTTON

jsAddToCart.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;

    let matchingItem;
    let selectQuantity = document.querySelector(
      `.select-quantity-${productId}`
    );
    selectQuantity = Number(selectQuantity.value);

    //  Sort-Out-Item-Quantity

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += selectQuantity;
    } else {
      cart.push({
        productId: productId,
        quantity: selectQuantity,
      });
    }

    document.querySelector(`.select-quantity-${productId}`).value = 1;

    let cartQuantity = 0;

    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

    // ITEM-NOTIFICATION

    itemNotification.style.display = "Block";

    setTimeout(function () {
      itemNotification.style.display = "None";
    }, 1500);

    console.log(cart);
  });
});
