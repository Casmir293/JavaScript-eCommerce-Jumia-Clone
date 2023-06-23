// DECLARE VARIABLES
const searchForm = document.querySelector("form");
const searchInput = document.querySelector('input[type="search"]');
const searchedResults = document.querySelector(".searchedResults");
const tabletBorder = document.querySelector(".tablet-border");
const footer = document.querySelector("footer");

// FILTER SEARCHED ITEM
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm)
  );

  //  Display Filtered Item
  if (searchInput.value.length === 0) {
    alert("Please Fill in the Search Field");
  }

  if (filteredProducts.length > 0) {
    tabletBorder.style.display = "none";
    searchedResults.innerHTML = "";

    //  Generate HTML for Filtered Item
    filteredProducts.forEach((product) => {
      const productHTML = `
    <div class="my-product col-sm-4 col-lg-2">
      <img src="${product.image}" class="product-image w-100"/>
      <p class="product-name my-2">${product.name}</p>
      <div class="d-flex align-items-center">
        <img src="images/ratings/rating-${
          product.rating.star * 10
        }.png" loading="lazy" class="rate-star h-auto me-3"/>
        <span class="text-primary">${product.rating.rateValue}</span>
      </div>
      <p class="my-1">&#8358; ${product.priceCent}</p>
      <div>
        <input type="number" value="1" min="1" max="99" class="select-quantity-${
          product.id
        } px-1"/>
      </div>
      <button class="add-to-cart js-add-to-cart text-light my-4 mx-auto mx-sm-0 d-flex px-5 py-2 rounded shadow border-1" data-product-id="${
        product.id
      }">
        Add to Cart
      </button>
      <div class="mobile-border border-secondary border-1 border-bottom mb-4"></div>
    </div>
  `;
      searchedResults.innerHTML += productHTML;
    });
  } else {
    searchedResults.innerHTML = `
    <div class="container text-center pt-5">
    <img
        src="images/binocular.png"
        class="h-auto w-25"
      />
    <h5 class="m-2">There are no results for "${searchInput.value}".</h5>
    <p>- Check your spelling for typing errors</p>
    <p>- Try searching with short and simple keywords</p>
    <p>- Try searching more general terms 
    </p>
    <button class="p-3 m-2 shadow-lg btn" style="background-color: orange;"><a href="jumia-clone.html" class="text-light text-decoration-none">GO TO HOMEPAGE</a></button>
    </div>
    `;
    tabletBorder.style.display = "None";
    footer.style.position = "fixed";
    footer.style.bottom = "0";
  }
  assignAddToCartListeners();
});
