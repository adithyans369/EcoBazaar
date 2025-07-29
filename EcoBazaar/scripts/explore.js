// Load products and display them<a href="cart.html" style="float:right; margin: 10px;">🛒 Cart</a>

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  if (!grid) {
    console.error("Container element not found.");
    return;
  }

  fetch("products.json")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch products");
      return response.json();
    })
    .then(products => {
      products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p>₹${product.price}</p>
          <button onclick="alert('Buying ${product.name}')">Buy</button>
          <button onclick="alert('Details of ${product.name}')">Details</button>
          <button onclick="addToCart('${product.id}', '${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
        `;
        grid.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Failed to load products:", error);
    });
});

// Cart logic
function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to cart!`);
}
