const cartItems = [];
let allProducts = [];

const loadProducts = ()=>{
// Fetch the data from the API and convert it to an array
fetch('https://fakestoreapi.com/products')
.then(response => response.json())
.then(dataArray => {
  // Now 'dataArray' is an array containing the fetched data
  showProducts(dataArray); // Call showProducts inside this block
})
.catch(error => {
  console.error("An error occurred:", error);
});
};

// show all product in UI 
const showProducts = (products)=>{
    allProducts = products.map((pd)=>pd);
    for (const product of allProducts) {
        const image = product.images;
        const rating = product.rating.rate;
        // dyanmaic icons
        const star1 = (rating > 4) ? 'fill-rate' : 'noRating';
        const star2 = (rating > 3 && rating <= 4) ? 'fill-rate' : 'noRating';
        const star3 = (rating > 2 && rating <= 3) ? 'fill-rate' : 'noRating';
        const star4 = (rating > 1 && rating <= 2) ? 'fill-rate' : 'noRating';
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3 class="product-title mt-4">${product.title}</h3>
      <p>Category: <b>${product.category}</b></p>
      <p class="product-ratings"><span>
      <i class="fas fa-star rating ${star1} ${star2} ${star3} ${star4}"></i>
      <i class="fas fa-star rating ${star1} ${star2} ${star3}"></i>
      <i class="fas fa-star rating ${star1} ${star2}"></i>
      <i class="fas fa-star rating ${star1}"></i>
      <i class="fas fa-star rating"></i>
      </span> (${product.rating.rate})</p>
      <p class="icon-detail"><i class="fas fa-user"></i> ${product.rating.count}</p>
      
      <h2 class="product-price">Price: $<b class="text-secondary"> ${product.price}</b></h2>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="btn the-btn">add to cart</button>
      <button id="details-btn" class="btn the-btn bg-primary">Details</button></div>
     `;

    const detailsButton = div.querySelector("#details-btn");
    detailsButton.addEventListener("click", () => {
      displayProductDetails(product);
    });


        document.getElementById("all-products").appendChild(div);
    }
}
;
let count = 0;
const addToCart = (id,price)=>{
    count = count + 1;
    updatePrice("price", price);

    updateTaxAndCharge();
    document.getElementById("total-Products").innerText = count;

    const product = allProducts.find((pd) => pd.id === id);
    const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
    };

    cartItems.push(cartItem);

    // Store the cartItems array in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // updateCartDisplay();

};
// Initialize the cartItems array by loading it from localStorage
// const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
// cartItems.push(...storedCartItems);
// updateCartDisplay();

const getInputValue = (id)=>{
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
}
;

// main price update function
const updatePrice = (id,value)=>{
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
}
;

// set innerText function
const setInnerText = (id,value)=>{
    document.getElementById(id).innerText = value.toFixed(2);
}
;

// update delivery charge and total Tax
const updateTaxAndCharge = ()=>{
    const priceConverted = getInputValue("price");
    if (priceConverted > 200) {
        setInnerText("delivery-charge", 30);
        setInnerText("total-tax", priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText("delivery-charge", 50);
        setInnerText("total-tax", priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText("delivery-charge", 60);
        setInnerText("total-tax", priceConverted * 0.4);
    }

    updateTotal();

}
;
//grandTotal update function
const updateTotal = ()=>{
    const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
    document.getElementById("total").innerText = grandTotal.toFixed(2);
};


const displayProductDetails = (product) => {
    const modal = document.createElement("div");
    modal.classList.add("product-details-modal");
    modal.innerHTML = `
      <h3>${product.title}</h3>
      <p>Category: <b>${product.category}</b></p>
      <p>Description: ${product.description}</p>
      <p>Price: $${product.price.toFixed(2)}</p>
      <button class="close-modal-btn">Close</button>
    `;
  
    document.body.appendChild(modal);
  
    const closeModalButton = modal.querySelector(".close-modal-btn");
    closeModalButton.addEventListener("click", () => {
      document.body.removeChild(modal);
    });
  };
  


loadProducts();



function performSearch(query) {
    if (query.trim() === "") {
        // If the search query is empty, load all products
        loadProducts();
    } else {
        // Filter products based on the search query
        const searchResults = allProducts.filter((product) => {
            return (
                product.title.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
        });

        // Clear the existing products
        const allProductsDiv = document.getElementById("all-products");
        allProductsDiv.innerHTML = "";

        // Display the search results
        showProducts(searchResults);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById("button-addon2");
    searchButton.addEventListener("click", () => {
        const searchQuery = document.getElementById("form-style").value;
        performSearch(searchQuery);
    });

    // Other initialization code here
    initializeSomeFeature();  // Call a custom initialization function
    setupEventListeners();

    // Call loadProducts or any other initialization functions here if needed
    loadProducts();
});


