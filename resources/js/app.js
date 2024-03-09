// app entrypoint
import '../css/app.css'
import './script'
console.log("kenek")
// const hamburger = document.querySelector("#hamburger")
//         const navMenu = document.querySelector("#nav-menu");
//         hamburger.addEventListener('click', function () {
//         hamburger.classList.toggle('hamburger-active');
//         navMenu.classList.toggle('hidden');
// });



// window.addEventListener('click', function (e) {
//     if (e.target != hamburger && e.target != navMenu) {
//       hamburger.classList.remove('hamburger-active');
//       navMenu.classList.add('hidden');
//     }
//   });

document.getElementById('menuBtn').addEventListener('click', function() {
    document.getElementById('mobileMenu').classList.toggle('hidden');
  });

  // Toggle services dropdown for desktop
  const servicesDropdownBtn = document.getElementById('servicesDropdownBtn');
  const servicesDropdown = document.getElementById('servicesDropdown');
  servicesDropdownBtn.addEventListener('mouseover', function() {
    servicesDropdown.classList.remove('hidden');
    servicesDropdownBtn.innerHTML = 'Services <i class="fas fa-chevron-up"></i>';
  });
  servicesDropdown.addEventListener('mouseout', function() {
    servicesDropdown.classList.add('hidden');
    servicesDropdownBtn.innerHTML = 'Services <i class="fas fa-chevron-down"></i>';
  });

  // Toggle services dropdown for mobile
  const servicesDropdownBtnMobile = document.getElementById('servicesDropdownBtnMobile');
  const servicesDropdownMobile = document.getElementById('servicesDropdownMobile');
  servicesDropdownBtnMobile.addEventListener('click', function() {
    servicesDropdownMobile.classList.toggle('hidden');
    if (!servicesDropdownMobile.classList.contains('hidden')) {
      servicesDropdownBtnMobile.innerHTML = 'Services <i class="fas fa-chevron-up"></i>';
    } else {
      servicesDropdownBtnMobile.innerHTML = 'Services <i class="fas fa-chevron-down"></i>';
    }
  });

  var cartCounter = document.querySelectorAll(".cart-counter");
  var cartPrice = document.querySelectorAll(".cart-price");
  var cartPriceQty = document.querySelectorAll(".cart-price-qty");
  var qtyClass = document.querySelectorAll(".qtyclass");

  const minusBtns = document.querySelectorAll('.minus-btn');
  minusBtns.forEach((btn,index) => {
    btn.addEventListener('click', function() {
      const quantityElem = btn.nextElementSibling;
      let quantity = parseInt(quantityElem.textContent);
      if (quantity > 1) {
        quantity--;
        quantityElem.textContent = quantity;
        qtyClass[index].value = quantity;
        const price = cartPrice[index].value;
        cartPriceQty[index].innerHTML = price*quantity;
      }
    });
  });

  // Plus Button Click Event
  const plusBtns = document.querySelectorAll('.plus-btn');
  plusBtns.forEach((btn,index) => {
    btn.addEventListener('click', function() {
      const quantityElem = btn.previousElementSibling;
      let quantity = parseInt(quantityElem.textContent);
      quantity++;
      quantityElem.textContent = quantity;
      qtyClass[index].value = quantity;
      const price = cartPrice[index].value;
      cartPriceQty[index].innerHTML = price*quantity;
    });
  });


  // const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
  //     addToCartBtns.forEach(btn => {
  //       btn.addEventListener('click', function() {
  //         // Get product details
  //         const productCard = btn.closest('.bg-white');
  //         const productImage = productCard.querySelector('img').src;
  //         const productTitle = productCard.querySelector('h3').textContent;
  //         const productPrice = productCard.querySelector('.text-gray-800').textContent;
          
  //         // Create cart item element
  //         const cartItem = document.createElement('div');
  //         cartItem.classList.add('flex', 'items-center', 'border-b', 'border-gray-200', 'py-4', 'px-6');
  //         cartItem.innerHTML = `
  //           <img src="${productImage}" alt="Product Image" class="w-16 h-16 object-cover rounded">
  //           <div class="ml-4 flex-1">
  //             <h2 class="text-lg font-semibold text-gray-800">${productTitle}</h2>
  //             <p class="text-gray-600">${productPrice}</p>
  //           </div>
  //         `;

  //         // Append cart item to cart list
  //         const cartList = document.querySelector('.cart-list');
  //         cartList.appendChild(cartItem);
  //       });
  //     });