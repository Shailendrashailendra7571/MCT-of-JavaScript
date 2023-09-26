const cartItems = [];
// Retrieve the cart items from localStorage
const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
cartItems.push(...storedCartItems);

// Function to update the cart display
const updateCartDisplay = () => {
    const cartContainer = document.getElementById('cart-items-container');
    cartContainer.innerHTML = ''; // Clear the cart display

    if (storedCartItems) {
        storedCartItems.forEach((item) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <p>${item.title}</p>
                <p>$${item.price.toFixed(2)}</p>
                <button>Buy Now</button>
                <button>Remove From Cart</button>
            `;
            cartContainer.appendChild(cartItemDiv);
        });
    }
};

// Call the function to update the cart display
updateCartDisplay();

// Add an event listener to call the displayCartItems function when the page loads
document.addEventListener('DOMContentLoaded', updateCartDisplay);
