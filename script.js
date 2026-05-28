const PRODUCT_IMAGES = [
  { full: 'images/image-product-1.jpg', thumb: 'images/image-product-1-thumbnail.jpg' },
  { full: 'images/image-product-2.jpg', thumb: 'images/image-product-2-thumbnail.jpg' },
  { full: 'images/image-product-3.jpg', thumb: 'images/image-product-3-thumbnail.jpg' },
  { full: 'images/image-product-4.jpg', thumb: 'images/image-product-4-thumbnail.jpg' },
];

const PRODUCT = {
  name: 'Fall Limited Edition Sneakers',
  price: 125.00,
};

let currentIndex = 0;
let cartQuantity = 0;

const mainImage = document.getElementById('mainImage');
const lightboxImage = document.getElementById('lightboxImage');
const mainThumbnails = document.querySelectorAll('.gallery .thumb');
const lightboxThumbnails = document.querySelectorAll('.lightbox .thumb');
const prevBtns = document.querySelectorAll('.prev-btn');
const nextBtns = document.querySelectorAll('.next-btn');
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const mobileNav = document.querySelector('.mobile-nav');
const overlay = document.querySelector('.overlay');
const cartBtn = document.querySelector('.cart-btn');
const cartDropdown = document.querySelector('.cart-dropdown');
const cartBadge = document.querySelector('.cart-badge');
const cartEmpty = document.querySelector('.cart-empty');
const cartItems = document.querySelector('.cart-items');
const cartItemQty = document.querySelector('.cart-item-qty');
const cartItemTotal = document.querySelector('.cart-item-total');
const deleteBtn = document.querySelector('.delete-btn');
const minusBtn = document.querySelector('.minus');
const plusBtn = document.querySelector('.plus');
const qtyCount = document.querySelector('.qty-count');
const addToCartBtn = document.querySelector('.add-to-cart');
const lightbox = document.querySelector('.lightbox');
const closeLightbox = document.querySelector('.close-lightbox');

function updateMainImage(index) {
  currentIndex = index;
  mainImage.src = PRODUCT_IMAGES[index].full;
  lightboxImage.src = PRODUCT_IMAGES[index].full;

  mainThumbnails.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  lightboxThumbnails.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

function navigateImage(direction) {
  const total = PRODUCT_IMAGES.length;
  const newIndex = (currentIndex + direction + total) % total;
  updateMainImage(newIndex);
}

function openMobileNav() {
  mobileNav.classList.add('open');
  overlay.classList.add('active');
}

function closeMobileNav() {
  mobileNav.classList.remove('open');
  overlay.classList.remove('active');
}

function toggleCart() {
  cartDropdown.classList.toggle('open');
}

function updateCartUI() {
  const hasItems = cartQuantity > 0;

  cartBadge.classList.toggle('hidden', !hasItems);
  cartBadge.textContent = cartQuantity;

  cartEmpty.classList.toggle('hidden', hasItems);
  cartItems.classList.toggle('hidden', !hasItems);

  if (hasItems) {
    cartItemQty.textContent = cartQuantity;
    cartItemTotal.textContent = `$${(PRODUCT.price * cartQuantity).toFixed(2)}`;
  }
}

function addToCart() {
  const qty = parseInt(qtyCount.textContent, 10);
  if (qty === 0) return;
  cartQuantity += qty;
  qtyCount.textContent = '0';
  updateCartUI();
}

function removeFromCart() {
  cartQuantity = 0;
  updateCartUI();
}

function openLightbox() {
  if (window.innerWidth >= 768) {
    lightbox.classList.add('open');
  }
}

function closeLightboxFn() {
  lightbox.classList.remove('open');
}

menuBtn.addEventListener('click', openMobileNav);
closeBtn.addEventListener('click', closeMobileNav);
overlay.addEventListener('click', closeMobileNav);

cartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleCart();
});

document.addEventListener('click', (e) => {
  if (!cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
    cartDropdown.classList.remove('open');
  }
});

deleteBtn.addEventListener('click', removeFromCart);

minusBtn.addEventListener('click', () => {
  const val = parseInt(qtyCount.textContent, 10);
  if (val > 0) qtyCount.textContent = val - 1;
});

plusBtn.addEventListener('click', () => {
  const val = parseInt(qtyCount.textContent, 10);
  qtyCount.textContent = val + 1;
});

addToCartBtn.addEventListener('click', addToCart);

mainImage.addEventListener('click', openLightbox);

closeLightbox.addEventListener('click', closeLightboxFn);

prevBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(-1);
  });
});

nextBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateImage(1);
  });
});

mainThumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const index = parseInt(thumb.dataset.index, 10);
    updateMainImage(index);
  });
});

lightboxThumbnails.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    const index = parseInt(thumb.dataset.index, 10);
    updateMainImage(index);
  });
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightboxFn();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightboxFn();
    closeMobileNav();
  }
  if (e.key === 'ArrowLeft') navigateImage(-1);
  if (e.key === 'ArrowRight') navigateImage(1);
});

updateCartUI();
