
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const body = document.body;
  const modeText = document.getElementById('mode-text');
  const productList = document.getElementById('product-list');
  const cartLink = document.getElementById('cart-link');
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const closeModal = document.querySelector('.close');
  const cartItemsContainer = document.getElementById('cart-items');

  const products = [
    { id: 9, name: "Smartphone", price: 499, quantity: 10, category: "Electronics", image: "iphone.jpg" },
    { id: 8, name: "Watch", price: 999, quantity: 5, category: "Electronics", image: "wath4.jpg" },
    { id: 5, name: "TV", price: 299, quantity: 3, category: "Electronics", image: "tv2.jpg" },
    { id: 4, name: "Headphones", price: 70, quantity: 15, category: "Electronics", image: "head.jpg" },
    { id: 2, name: "Smartphone", price: 499, quantity: 10, category: "Electronics", image: "ip.jpg" },
    { id: 8, name: "Watch", price: 999, quantity: 5, category: "Electronics", image: "wath3.jpg" },
    { id: 4, name: "Headphones", price: 70, quantity: 15, category: "Electronics", image: "head2.jpg" },
    { id: 7, name: "Watch", price: 999, quantity: 50, category: "Electronics", image: "wat2.png" },
    { id: 1, name: "Laptop", price: 999, quantity: 5, category: "Electronics", image: "Apple.jpg" },
    { id: 4, name: "Headphones", price: 70, quantity: 15, category: "Electronics", image: "head3.jpg" },
    { id: 8, name: "Watch", price: 999, quantity: 5, category: "Electronics", image: "wat.jpg" }
  ];


  const productName = document.getElementById('filterinput');
  productName.addEventListener('input', (event) => {
    const productNameValue = event.target.value;
    const filteredProducts = filterProducts(products, productNameValue);
    renderProducts(filteredProducts);
  });

  function filterProducts(items, filterValue) {
    return items.filter(product => product.name.toLowerCase().includes(filterValue.toLowerCase()));
  }

  function renderProducts(products) {
    productList.innerHTML = products.map(product =>
      `<div class="product" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <p>Category: ${product.category}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>`
    ).join('');
  }

  renderProducts(products);

  let cart = [];

  function updateCartCount() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }

  function updateCartModal() {
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="item-details">
                  <p>${item.name}</p>
                  <p>$${item.price.toFixed(2)}</p>
                  <div class="quantity-controls">
                      <button class="decrease-quantity" data-id="${item.id}">-</button>
                      <span>${item.quantity}</span>
                      <button class="increase-quantity" data-id="${item.id}">+</button>
                  </div>
                  <button class="remove-from-cart" data-id="${item.id}">Remove</button>
              </div>
          `;
      cartItemsContainer.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerHTML = `<strong>Total Price: $${totalPrice.toFixed(2)}</strong>`;
  }

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.dataset.id);
      const product = products.find(p => p.id === productId);
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartCount();
      updateCartModal();
    }

    if (event.target.classList.contains('remove-from-cart')) {
      const productId = parseInt(event.target.dataset.id);
      cart = cart.filter(item => item.id !== productId);
      updateCartCount();
      updateCartModal();
    }

    if (event.target.classList.contains('decrease-quantity')) {
      const productId = parseInt(event.target.dataset.id);
      const cartItem = cart.find(item => item.id === productId);

      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        cart = cart.filter(item => item.id !== productId);
      }
      updateCartCount();
      updateCartModal();
    }

    if (event.target.classList.contains('increase-quantity')) {
      const productId = parseInt(event.target.dataset.id);
      const cartItem = cart.find(item => item.id === productId);
      cartItem.quantity++;
      updateCartCount();
      updateCartModal();
    }
  });

  cartLink.onclick = function () {
    cartModal.style.display = 'block';
  }

  closeModal.onclick = function () {
    cartModal.style.display = 'none';
  }

  window.onclick = function (event) {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    document.querySelector('.navbar').classList.toggle('dark-mode');
    document.querySelectorAll('.product').forEach(product => {
      product.classList.toggle('dark-mode');
    });

    if (body.classList.contains('dark-mode')) {
      modeText.textContent = 'Dark';
    } else {
      modeText.textContent = 'Light';
    }
  });

  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
});



