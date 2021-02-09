class CartObject {
  constructor() {
    this.cartContent = [];
    this.checkLocalStorage();
  }

  checkLocalStorage() {
    if (localStorage.getItem('cartContent') == null) {
      this.cartContent = [];
    } else {
      this.cartContent = JSON.parse(localStorage.getItem('cartContent'));
    }
  }

  addToCart(teddybear) {
    for (let cartItem of this.cartContent) {
      if (cartItem.id === teddybear.id && cartItem.color === teddybear.color) {
        cartItem.quantity++;
        localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
        return;
      }
    }
    this.cartContent.push({
      'name': teddybear.name,
      'price': teddybear.price,
      'id': teddybear.id,
      'color': teddybear.color,
      'quantity': 1
    });
    localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
  }

  deleteItem(createTr, cartItem) {
    const tdDelete = document.createElement('td');
    tdDelete.setAttribute('class', 'tdDelete');
    createTr.appendChild(tdDelete);
    const createIcon = document.createElement('i');
    createIcon.setAttribute("class", "far fa-trash-alt removeProduct");
    tdDelete.appendChild(createIcon);

    createIcon.addEventListener('click', (e) => {
      const index = this.cartContent.indexOf(cartItem);
      const removeTeddy = this.cartContent.splice(index, 1);
      localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
      window.location.reload();
    })
  }

  removeItem(buttonLess, cartItem, Pquantity) {
    buttonLess.addEventListener('click', (e) => {
      cartItem.quantity--;
      localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
      Pquantity.textContent = cartItem.quantity;
      window.location.reload();
      if (cartItem.quantity === 0) {
        const id = this.cartContent.indexOf(cartItem);
        const removedItem = this.cartContent.splice(id, 1);
        localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
        this.updateTotal();
      }
    })
  }

  addItem(buttonAdd, cartItem, Pquantity) {
    buttonAdd.addEventListener('click', (e) => {
      cartItem.quantity++;
      localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
      Pquantity.textContent = cartItem.quantity;
      this.updateTotal();
    })
  }

  updateTotal() {
    const getPTotal = document.querySelector('.total');
    let cartTotal = 0;
    this.cartContent.forEach(cartItem => {
      cartTotal += parseInt(cartItem.quantity) * parseInt(cartItem.price);
    })
    getPTotal.textContent = 'Total  ' + cartTotal + '€';
  }

  emptyCart() {
    const buttonEmptyCart = document.querySelector('.emptyCart');

    buttonEmptyCart.addEventListener('click', (e) => {
      localStorage.clear();
      window.location.reload();
    })
  }

  cartItems() {
    let getTbody = document.querySelector('#details-article');

    for (let cartItem of this.cartContent) {
      const createTr = document.createElement('tr');
      createTr.setAttribute('class', 'createTr');
      getTbody.appendChild(createTr);

      const tdName = document.createElement('td');
      tdName.textContent = cartItem.name;
      createTr.appendChild(tdName);

      const tdColor = document.createElement('td');
      tdColor.textContent = cartItem.color;
      createTr.appendChild(tdColor);

      const tdQuantity = document.createElement('td');
      createTr.appendChild(tdQuantity);
      const divQuantity = document.createElement('div');
      divQuantity.setAttribute('class', 'adjustQuantity');
      tdQuantity.appendChild(divQuantity);

      const buttonLess = document.createElement('p');
      buttonLess.setAttribute('class', 'addMinus');
      buttonLess.textContent = '-';
      divQuantity.appendChild(buttonLess);
      
      const Pquantity = document.createElement('p');
      Pquantity.textContent = cartItem.quantity;
      divQuantity.appendChild(Pquantity);

      const buttonAdd = document.createElement('p');
      buttonAdd.setAttribute('class', 'addMinus');
      buttonAdd.textContent = '+';
      divQuantity.appendChild(buttonAdd);

      const tdPrice = document.createElement('td');
      tdPrice.textContent = cartItem.price;
      createTr.appendChild(tdPrice);

      this.updateTotal();
      this.removeItem(buttonLess, cartItem, Pquantity);
      this.addItem(buttonAdd, cartItem, Pquantity);
      this.deleteItem(createTr, cartItem);
    }
  }

  checkFormInput() {
    // RegExp
    let checkString = /[a-zA-Z\s\-]{3,}/;
    let checkEmail = /.+@.+\..+/;
    let checkAddress = /\d{1,5}[a-zA-Z0-9\s]/;

    let formLastName = document.getElementById("formLastName").value;
    let formFirstName = document.getElementById("formFirstName").value;
    let formAddress = document.getElementById("formAddress").value;
    let formCity = document.getElementById("formCity").value;
    let formEmail = document.getElementById("formEmail").value;

    if (checkString.test(formLastName) == false) {
      let errorLastName = document.querySelector('#errorLastName');
      errorLastName.style.display = 'unset';
      errorLastName.textContent = "Veuillez renseigner votre nom";
      return false;
    } else if (checkString.test(formFirstName) == false) {
      let errorFirstName = document.querySelector('#errorFirstName');
      errorFirstName.style.display = 'unset';
      errorFirstName.textContent = "Veuillez renseigner votre prénom";
      return false;
    } else if (checkEmail.test(formEmail) == false) {
      let errorEmail = document.querySelector('#errorEmail');
      errorEmail.style.display = 'unset';
      errorEmail.textContent = "Votre email doit être au format xxx@yyy.zzz";
      return false;
    } else if (checkAddress.test(formAddress) == false) {
      let errorAddress = document.querySelector('#errorAddress');
      errorAddress.style.display = 'unset';
      errorAddress.textContent = "Veuillez renseigner votre adresse";
      return false;
    } else if (checkString.test(formCity) == false) {
      let errorCity = document.querySelector('#errorCity');
      errorCity.style.display = 'unset';
      errorCity.textContent = "Veuillez renseigner le nom de votre ville";
      return false;
    } else {
      return true;
    }
  }

  validateForm() {
    let btnForm = document.querySelector('.btnForm');
    btnForm.addEventListener("click", (event) => {
      event.preventDefault();
      if (this.cartContent >= [0] && this.checkFormInput() == true) {
        let contact = {
          lastName: document.getElementById("formLastName").value,
          firstName: document.getElementById("formFirstName").value,
          email: document.getElementById("formEmail").value,
          address: document.getElementById("formAddress").value,
          city: document.getElementById("formCity").value,
        }
        let products = [];
        for (let product of this.cartContent) {
          for (let i = 0; i < product.quantity; i++) {
            products.push(product.id);
          }
        }
        let contactProducts = {
          contact,
          products
        };
        console.log(contactProducts);

        let objetRequest = JSON.stringify(contactProducts);
        console.log(objetRequest);

        let request = new XMLHttpRequest();
        let url = "http://localhost:3000/api/teddies/order";
        (async () => {
          const envoiForm = fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
              'Accept': 'application/JSON',
              'Content-Type': 'application/JSON'
            },
            body: objetRequest,
          }).then((response) => {
            return response.json();
          }).then((data) => {
            console.log(data);
            // this.clearCart();
            localStorage.setItem('order', JSON.stringify(data));
            // console.log(this.cart);

            document.location.href = "confirmation.html"
          });
        })();
      }
    })
  }

  resultOrder() {
    if (localStorage.getItem("order") != null) {
      this.contactProducts = JSON.parse(localStorage.getItem("order"));
      console.log(this.contactProducts.contact.lastName);
      document.querySelector("#orderID").innerHTML = 'Le numéro de votre commande: ' + this.contactProducts.orderId;
      document.querySelector("#orderLastName").innerHTML = 'Nom: ' + this.contactProducts.contact.lastName;
      document.querySelector("#orderFirstName").innerHTML = 'Prénom: ' + this.contactProducts.contact.firstName;
      document.querySelector("#orderEmail").innerHTML = 'Email: ' + this.contactProducts.contact.email;
      document.querySelector("#orderAddress").innerHTML = 'Adresse: ' + this.contactProducts.contact.address;
      document.querySelector("#orderCity").innerHTML = 'Ville: ' + this.contactProducts.contact.city;
      this.emptyCart();
    }
  }
}