let cart = [];

// Load cart from localStorage on page load
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("frutee_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  updateCartCount();
}

function saveCartToStorage() {
  localStorage.setItem("frutee_cart", JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

function renderCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p class='text-muted'>Your cart is empty.</p>";
    document.getElementById("cart-total").textContent = "$0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    cartItemsDiv.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-3">
        <div>
          <strong>${item.name}</strong><br>
          <small>$${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</small>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-outline-secondary btn-sm me-2" onclick="decreaseQuantity(${index})">−</button>
          <span class="mx-1">${item.quantity}</span>
          <button class="btn btn-outline-secondary btn-sm ms-2" onclick="increaseQuantity(${index})">+</button>
          <button class="btn btn-danger btn-sm ms-3" onclick="removeFromCart(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
}

function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartCount();
  renderCart();
}

// Load cart when page is ready
document.addEventListener("DOMContentLoaded", loadCartFromStorage);
