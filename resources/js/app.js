// app entrypoint
import '../css/app.css'
import './script'
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
    servicesDropdownBtn.innerHTML = 'Order <i class="fas fa-chevron-up"></i>';
  });
  servicesDropdown.addEventListener('mouseout', function() {
    servicesDropdown.classList.add('hidden');
    servicesDropdownBtn.innerHTML = 'Order <i class="fas fa-chevron-down"></i>';
  });

  // Toggle services dropdown for mobile
  const servicesDropdownBtnMobile = document.getElementById('servicesDropdownBtnMobile');
  const servicesDropdownMobile = document.getElementById('servicesDropdownMobile');
  servicesDropdownBtnMobile.addEventListener('click', function() {
    servicesDropdownMobile.classList.toggle('hidden');
    if (!servicesDropdownMobile.classList.contains('hidden')) {
      servicesDropdownBtnMobile.innerHTML = 'Order <i class="fas fa-chevron-up"></i>';
    } else {
      servicesDropdownBtnMobile.innerHTML = 'Order <i class="fas fa-chevron-down"></i>';
    }
  });

  var totalPrice = document.getElementById("total-price");
  var cartPrice = document.querySelectorAll(".cart-price");
  var cartPriceQty = document.querySelectorAll(".cart-price-qty");
  var qtyClass = document.querySelectorAll(".qtyclass");
  var checkIds = document.querySelectorAll(".checkcartids");
  var deleteCart = document.querySelectorAll(".delete-cart");
  var cartDel = document.querySelectorAll(".cart-del")

    cartPriceQty.forEach((v,i)=>{
      const priceQty = parseInt(v.innerHTML).toLocaleString("id");
      cartPriceQty[i].innerHTML = priceQty;
    })
 

  var orderPrice = parseInt(totalPrice.innerHTML);
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
        const priceQty = (price*quantity).toLocaleString("id");
        cartPriceQty[index].innerHTML = price*quantity;
        hasil();
        cartPriceQty[index].innerHTML = priceQty;
      
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
      const priceQty = (price*quantity).toLocaleString("id");
      cartPriceQty[index].innerHTML = price*quantity;
      hasil();
      cartPriceQty[index].innerHTML = priceQty;
    });
  });
  function hasil(){
    var oalah = 0;
    cartPrice.forEach((v,i)=>{
      if(checkIds[i].checked){
        oalah = oalah + parseInt(v.value*qtyClass[i].value)
      }
    })
    var hee = oalah.toLocaleString('id');
    document.getElementById("total-price").innerHTML = hee;
    
  }