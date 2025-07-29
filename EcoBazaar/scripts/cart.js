// scripts/cart.js

document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-container");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }

    let total = 0;

    cart.forEach((product, index) => {
      total += parseFloat(product.price);

      const item = document.createElement("div");
      item.className = "cart-item";

      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <div class="cart-item-details">
          <h3>${product.name}</h3>
          <p>₹${product.price}</p>
        </div>
        <div class="cart-item-actions">
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;

      cartContainer.appendChild(item);
    });

    const totalEl = document.createElement("div");
    totalEl.className = "total";
    totalEl.innerHTML = `Total: ₹${total.toFixed(2)}`;

    const checkoutBtn = document.createElement("button");
    checkoutBtn.className = "checkout-btn";
    checkoutBtn.textContent = "Proceed to Checkout";
    checkoutBtn.onclick = () => alert("Checkout functionality coming soon!");

    cartContainer.appendChild(totalEl);
    cartContainer.appendChild(checkoutBtn);

    setupRemoveButtons();
  }

  function setupRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      });
    });
  }

  renderCart();
});
