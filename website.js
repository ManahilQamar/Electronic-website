document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-btn');
  const body = document.body;
  const modeText = document.getElementById('mode-text');
  const productList = document.getElementById('product-list');
  const searchList = document.getElementById('search-items');
  const cartLink = document.getElementById('cart-link');
  const heartLink = document.getElementById('heart-icon');
  const cartCount = document.getElementById('cart-count');
  const cartModal = document.getElementById('cart-modal');
  const heartModal = document.getElementById('heart-modal');
  const closeModal = document.querySelector('.close');
  const cartItemsContainer = document.getElementById('cart-items');
  const heartItemsContainer = document.getElementById('heart-items');

  const products = [
  
    { id: 9, name: "Smartphone", price: 499, quantity: 10, category: "Electronics", image: "iphone.jpg" },
    { id: 8, name: "Watch", price: 999, quantity: 5, category: "Electronics", image: "wath4.jpg" },
    { id: 5, name: "TV", price: 299, quantity: 3, category: "Electronics", image: "bgTv.png" },
    { id: 4, name: "Headphones", price: 70, quantity: 15, category: "Electronics", image: "bgHead.png" },
    { id: 2, name: "Smartphone", price: 499, quantity: 10, category: "Electronics", image: "ip.png" },
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
    productNameValue === "" ? renderProducts2([]) : renderProducts2(filteredProducts);
    console.log(productNameValue);
  });

  function filterProducts(items, filterValue) {
    return items.filter(product => product.name.toLowerCase().includes(filterValue.toLowerCase()));
  }



  productList.innerHTML = products.map(product =>
    `<div class="product" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Price: $${product.price}</p>
        <p>Quantity: ${product.quantity}</p>
        <p>Category: ${product.category}</p>
        <div class="bx bx-cart add-to-cart" data-id="${product.id}"></div>
        <div class="bx bx-heart add-to-heart" data-id="${product.id}"></div>
      </div>`
  ).join('');

  let cart = [];
  let likedItems = [];

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

  function updateHeartCount() {
    document.getElementById('heart-count').textContent = likedItems.length;
  }

  function updateHeartModal() {
    heartItemsContainer.innerHTML = '';
    likedItems.forEach(item => {
      const heartItem = document.createElement('div');
      heartItem.classList.add('heart-item');
      heartItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="heart-item-image">
          <div class="item-details">
              <p>${item.name}</p>
              <p>$${item.price.toFixed(2)}</p>
              <button class="remove-from-heart" data-id="${item.id}">Remove</button>
          </div>
      `;
      heartItemsContainer.appendChild(heartItem);
    });
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

    if (event.target.classList.contains('add-to-heart')) {
      const productId = parseInt(event.target.dataset.id);
      const product = products.find(p => p.id === productId);
      const heartIcon = event.target;

      if (likedItems.some(item => item.id === productId)) {
        likedItems = likedItems.filter(item => item.id !== productId);
        heartIcon.classList.remove('liked');
      } else {
        likedItems.push(product);
        heartIcon.classList.add('liked');
      }
      updateHeartCount();
      updateHeartModal();
    }

    if (event.target.classList.contains('remove-from-heart')) {
      const productId = parseInt(event.target.dataset.id);
      likedItems = likedItems.filter(item => item.id !== productId);
      updateHeartCount();
      updateHeartModal();
    }
  });

  cartLink.onclick = function () {
    cartModal.style.display = 'block';
  }

  heartLink.onclick = function () {
    heartModal.style.display = 'block';
    updateHeartModal();
  }

  closeModal.onclick = function () {
    cartModal.style.display = 'none';
  }

  const closeHeartModal = document.getElementById('close-heart-modal');
  closeHeartModal.onclick = function () {
    heartModal.style.display = 'none';
  }

  window.onclick = function (event) {
    if (event.target === cartModal) {
      cartModal.style.display = 'none';
    }

    if (event.target === heartModal) {
      heartModal.style.display = 'none';
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

  const searchIcon = document.getElementById('search-icon');
  const modal = document.getElementById('modal');
  const closeModal2 = document.getElementById('close-modal');

  searchIcon.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeModal2.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});




let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let backButton = document.getElementById('back');
let searchMoreButtons = document.querySelectorAll('.searchMore');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');

nextButton.onclick = function () {
  showSlider('next');
}

prevButton.onclick = function () {
  showSlider('prev');
}

let unAcceptClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = 'none';
  prevButton.style.pointerEvents = 'none';
  carousel.classList.remove('prev', 'next');

  let items = document.querySelectorAll('.carousel .list .item');

  if (type === 'next') {
    listHTML.appendChild(items[0]);
    carousel.classList.add('next');
  } else {
    listHTML.insertBefore(items[items.length - 1], items[0]);
    carousel.classList.add('prev');
  }

  setTimeout(() => {
    carousel.classList.remove('next', 'prev');
  }, 1100);

  clearTimeout(unAcceptClick);
  unAcceptClick = setTimeout(() => {
    nextButton.style.pointerEvents = 'auto';
    prevButton.style.pointerEvents = 'auto';
  }, 2000);
}

searchMoreButtons.forEach(button => {
  button.onclick = function() {
    carousel.classList.add('showDetail');
  }
});

backButton.onclick = function() {
  carousel.classList.remove('showDetail');
}







