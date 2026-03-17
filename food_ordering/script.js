/* =========================================================
   FoodieExpress – script.js
   ========================================================= */

"use strict";

// ──────────────────────────────────────────────
// 1.  MENU DATA
// ──────────────────────────────────────────────
const menuItems = [
  // Starters
  { id: 1,  cat: "starters", emoji: "🥗", name: "Garden Fresh Salad",       desc: "Crispy lettuce, tomatoes, cucumbers, olives & vinaigrette dressing.",   price: 149, rating: "4.5 ★" },
  { id: 2,  cat: "starters", emoji: "🍲", name: "Cream of Tomato Soup",      desc: "Velvety tomato soup with fresh basil and a swirl of cream.",           price: 129, rating: "4.6 ★" },
  { id: 3,  cat: "starters", emoji: "🥟", name: "Veg Momos (8 pcs)",        desc: "Steamed dumplings stuffed with spiced vegetables. Served with chutney.",price: 139, rating: "4.7 ★" },
  { id: 4,  cat: "starters", emoji: "🍗", name: "Chicken Tikka Bites",       desc: "Tender chicken marinated in spices and grilled to perfection.",        price: 229, rating: "4.8 ★" },

  // Main Course
  { id: 5,  cat: "main",     emoji: "🍛", name: "Butter Chicken",            desc: "Succulent chicken cooked in rich tomato-butter gravy with aromatic spices.", price: 299, rating: "4.9 ★" },
  { id: 6,  cat: "main",     emoji: "🫕", name: "Dal Makhani",               desc: "Slow-cooked black lentils simmered overnight in a creamy sauce.",     price: 249, rating: "4.7 ★" },
  { id: 7,  cat: "main",     emoji: "🍚", name: "Veg Biryani",               desc: "Fragrant basmati rice layered with fresh vegetables & whole spices.",  price: 219, rating: "4.6 ★" },
  { id: 8,  cat: "main",     emoji: "🍝", name: "Pasta Arrabbiata",          desc: "Penne tossed in a spicy tomato-garlic sauce with fresh herbs.",       price: 239, rating: "4.5 ★" },
  { id: 9,  cat: "main",     emoji: "🍱", name: "Paneer Tikka Masala",       desc: "Cottage cheese cubes in a bold, spiced tomato-onion gravy.",          price: 269, rating: "4.8 ★" },

  // Pizza
  { id: 10, cat: "pizza",    emoji: "🍕", name: "Margherita Pizza",          desc: "Classic tomato base, mozzarella and fresh basil on a crispy crust.",  price: 279, rating: "4.7 ★" },
  { id: 11, cat: "pizza",    emoji: "🍕", name: "BBQ Chicken Pizza",         desc: "Smoky BBQ sauce, grilled chicken, onions and mozzarella.",            price: 349, rating: "4.8 ★" },
  { id: 12, cat: "pizza",    emoji: "🍕", name: "Paneer & Pepper Pizza",     desc: "Spiced paneer, capsicum, jalapeños and cheese on a thick crust.",     price: 329, rating: "4.6 ★" },

  // Burgers
  { id: 13, cat: "burgers",  emoji: "🍔", name: "Classic Veg Burger",        desc: "Golden veggie patty, lettuce, cheese and special burger sauce.",      price: 159, rating: "4.5 ★" },
  { id: 14, cat: "burgers",  emoji: "🍔", name: "Crispy Chicken Burger",     desc: "Crispy fried chicken fillet with coleslaw and sriracha mayo.",        price: 199, rating: "4.8 ★" },
  { id: 15, cat: "burgers",  emoji: "🌮", name: "Spicy Bean Tacos (2 pcs)",  desc: "Crunchy tacos packed with spiced beans, salsa and sour cream.",       price: 179, rating: "4.6 ★" },

  // Desserts
  { id: 16, cat: "desserts", emoji: "🍰", name: "Chocolate Lava Cake",       desc: "Warm chocolate sponge with a gooey molten centre. Served with ice cream.", price: 189, rating: "4.9 ★" },
  { id: 17, cat: "desserts", emoji: "🍮", name: "Mango Panna Cotta",         desc: "Silky Italian cream dessert topped with fresh mango coulis.",         price: 169, rating: "4.7 ★" },
  { id: 18, cat: "desserts", emoji: "🧁", name: "Red Velvet Cupcake",        desc: "Moist red velvet cake with a swirl of cream cheese frosting.",        price: 99,  rating: "4.6 ★" },
  { id: 19, cat: "desserts", emoji: "🍨", name: "Gulab Jamun Ice Cream",     desc: "Homemade gulab jamun served atop a scoop of vanilla ice cream.",      price: 129, rating: "4.8 ★" },

  // Drinks
  { id: 20, cat: "drinks",   emoji: "🥤", name: "Mango Lassi",              desc: "Thick and creamy blended yogurt drink with fresh Alphonso mango.",    price: 89,  rating: "4.7 ★" },
  { id: 21, cat: "drinks",   emoji: "☕", name: "Cold Coffee",              desc: "Chilled espresso blended with milk and a dollop of ice cream.",       price: 99,  rating: "4.6 ★" },
  { id: 22, cat: "drinks",   emoji: "🧃", name: "Fresh Lime Soda",          desc: "Zesty lime with sparkling water, a pinch of salt and mint.",         price: 69,  rating: "4.5 ★" },
  { id: 23, cat: "drinks",   emoji: "🍵", name: "Masala Chai",              desc: "Aromatic Indian spiced tea brewed with ginger, cardamom and milk.",   price: 49,  rating: "4.8 ★" },
];

// ──────────────────────────────────────────────
// 2.  CART STATE
// ──────────────────────────────────────────────
let cart = {};   // { itemId: quantity }

// ──────────────────────────────────────────────
// 3.  RENDER HELPERS
// ──────────────────────────────────────────────

function buildMenuGrid(filter = "all") {
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = "";

  const filtered = filter === "all" ? menuItems : menuItems.filter(i => i.cat === filter);

  filtered.forEach(item => {
    const qty = cart[item.id] || 0;
    const card = document.createElement("div");
    card.className = "food-card";
    card.dataset.id = item.id;
    card.innerHTML = `
      <div class="food-card-img">${item.emoji}</div>
      <div class="food-card-body">
        <div class="food-card-title">${item.name}</div>
        <div class="food-card-desc">${item.desc}</div>
        <div class="food-card-footer">
          <div>
            <div class="food-price">₹${item.price}</div>
            <div class="food-rating">${item.rating}</div>
          </div>
          ${qty === 0
            ? `<button class="add-btn" data-id="${item.id}">+ Add</button>`
            : `<div class="qty-control">
                 <button class="qty-dec" data-id="${item.id}">−</button>
                 <span class="qty-num">${qty}</span>
                 <button class="qty-inc" data-id="${item.id}">+</button>
               </div>`
          }
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function renderCartSidebar() {
  const container   = document.getElementById("cartItems");
  const footer      = document.getElementById("cartFooter");
  const subtotalEl  = document.getElementById("cartSubtotal");
  const totalEl     = document.getElementById("cartTotal");
  const countEl     = document.getElementById("cartCount");

  const entries = Object.entries(cart).filter(([, qty]) => qty > 0);

  countEl.textContent = entries.reduce((s, [, q]) => s + q, 0);

  if (entries.length === 0) {
    container.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
    footer.style.display = "none";
    return;
  }

  let subtotal = 0;
  container.innerHTML = "";

  entries.forEach(([id, qty]) => {
    const item = menuItems.find(m => m.id === +id);
    const lineTotal = item.price * qty;
    subtotal += lineTotal;

    const el = document.createElement("div");
    el.className = "cart-item";
    el.innerHTML = `
      <div class="cart-item-emoji">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${item.price} × ${qty} = ₹${lineTotal}</div>
      </div>
      <div class="cart-item-qty">
        <button class="cart-dec" data-id="${item.id}">−</button>
        <span>${qty}</span>
        <button class="cart-inc" data-id="${item.id}">+</button>
      </div>`;
    container.appendChild(el);
  });

  const delivery = 40;
  subtotalEl.textContent = `₹${subtotal}`;
  totalEl.textContent    = `₹${subtotal + delivery}`;
  footer.style.display   = "flex";
}

// ──────────────────────────────────────────────
// 4.  CART HELPERS
// ──────────────────────────────────────────────

function changeQty(id, delta) {
  const current = cart[id] || 0;
  const next = current + delta;
  if (next <= 0) {
    delete cart[id];
  } else {
    cart[id] = next;
  }
}

function refreshAll(activeFilter) {
  buildMenuGrid(activeFilter);
  renderCartSidebar();
}

// ──────────────────────────────────────────────
// 5.  EVENT DELEGATION – MENU GRID
// ──────────────────────────────────────────────

document.getElementById("menuGrid").addEventListener("click", e => {
  const addBtn  = e.target.closest(".add-btn");
  const incBtn  = e.target.closest(".qty-inc");
  const decBtn  = e.target.closest(".qty-dec");

  const activeFilter = document.querySelector(".cat-btn.active").dataset.cat;

  if (addBtn) {
    const id = +addBtn.dataset.id;
    changeQty(id, 1);
    refreshAll(activeFilter);
  } else if (incBtn) {
    changeQty(+incBtn.dataset.id, 1);
    refreshAll(activeFilter);
  } else if (decBtn) {
    changeQty(+decBtn.dataset.id, -1);
    refreshAll(activeFilter);
  }
});

// ──────────────────────────────────────────────
// 6.  EVENT DELEGATION – CART SIDEBAR
// ──────────────────────────────────────────────

document.getElementById("cartItems").addEventListener("click", e => {
  const incBtn = e.target.closest(".cart-inc");
  const decBtn = e.target.closest(".cart-dec");
  const activeFilter = document.querySelector(".cat-btn.active").dataset.cat;

  if (incBtn) { changeQty(+incBtn.dataset.id,  1); refreshAll(activeFilter); }
  if (decBtn) { changeQty(+decBtn.dataset.id, -1); refreshAll(activeFilter); }
});

// ──────────────────────────────────────────────
// 7.  CATEGORY FILTER
// ──────────────────────────────────────────────

document.getElementById("categoryBar").addEventListener("click", e => {
  const btn = e.target.closest(".cat-btn");
  if (!btn) return;
  document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  buildMenuGrid(btn.dataset.cat);
});

// ──────────────────────────────────────────────
// 8.  CART SIDEBAR OPEN / CLOSE
// ──────────────────────────────────────────────

const cartSidebar  = document.getElementById("cartSidebar");
const cartOverlay  = document.getElementById("cartOverlay");

function openCart()  { cartSidebar.classList.add("open"); cartOverlay.classList.add("show"); }
function closeCartFn(){ cartSidebar.classList.remove("open"); cartOverlay.classList.remove("show"); }

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCartFn);
cartOverlay.addEventListener("click", closeCartFn);

// ──────────────────────────────────────────────
// 9.  CHECKOUT FLOW
// ──────────────────────────────────────────────

const orderModal   = document.getElementById("orderModal");
const successModal = document.getElementById("successModal");

document.getElementById("checkoutBtn").addEventListener("click", () => {
  closeCartFn();
  // compute total
  const subtotal = Object.entries(cart)
    .filter(([, q]) => q > 0)
    .reduce((s, [id, q]) => s + menuItems.find(m => m.id === +id).price * q, 0);
  document.getElementById("modalTotal").textContent = `₹${subtotal + 40}`;
  orderModal.style.display = "flex";
});

document.getElementById("cancelOrder").addEventListener("click", () => {
  orderModal.style.display = "none";
});

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const name    = document.getElementById("custName").value.trim();
  const phone   = document.getElementById("custPhone").value.trim();
  const address = document.getElementById("custAddress").value.trim();
  const method  = document.getElementById("payMethod");
  const payLabel = method.options[method.selectedIndex].text;

  // Validate phone: optional leading +, then 7–15 digits (spaces/hyphens allowed as separators)
  if (!/^\+?[\d]{1,4}[\s\-]?(?:[\d][\s\-]?){6,14}[\d]$/.test(phone.replace(/\s/g, " "))) {
    alert("Please enter a valid phone number (7–15 digits, optional country code).");
    return;
  }

  const total = document.getElementById("modalTotal").textContent;

  orderModal.style.display = "none";

  // Generate a collision-resistant order ID: timestamp + 4-digit random suffix
  const orderId = "FE" + Date.now().toString().slice(-8) +
    Math.floor(1000 + Math.random() * 9000);
  document.getElementById("successMsg").innerHTML =
    `Hi <strong>${name}</strong>! Your order <strong>#${orderId}</strong> has been placed.<br>
     Total: <strong>${total}</strong> via ${payLabel}.<br>
     Estimated delivery to <em>${address.split("\n")[0]}</em>: <strong>25–35 min</strong> 🚀`;

  successModal.style.display = "flex";

  // Clear cart
  cart = {};
  refreshAll(document.querySelector(".cat-btn.active").dataset.cat);
});

document.getElementById("closeSuccess").addEventListener("click", () => {
  successModal.style.display = "none";
  document.getElementById("orderForm").reset();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ──────────────────────────────────────────────
// 10.  CONTACT FORM
// ──────────────────────────────────────────────

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const msgEl = document.getElementById("contactMsg");
  msgEl.textContent = "✅ Thank you! We'll get back to you shortly.";
  e.target.reset();
  setTimeout(() => { msgEl.textContent = ""; }, 5000);
});

// ──────────────────────────────────────────────
// 11.  INIT
// ──────────────────────────────────────────────

buildMenuGrid("all");
