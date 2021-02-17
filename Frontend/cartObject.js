class CartObject {
  constructor() {
    this.cartContent = [];
    this.createTr = document.createElement('tr');
    this.checkLocalStorage();
  }

  getItem() {
    this.cartContent = JSON.parse(localStorage.getItem('cartContent'));
  }
  setItem() {
    localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
  }

  checkLocalStorage() {
    if (localStorage.getItem('cartContent') == null) {
      this.cartContent = [];
    } else {
      this.getItem();
    }
  }

  addToCart(teddybear) {
    for (let cartItem of this.cartContent) {
      if (cartItem.id === teddybear.id && cartItem.color === teddybear.color) {
        cartItem.quantity++;
        this.setItem();
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
    this.setItem();
  }

//cartHTMLElement: create td element for name, color  and price
  cartHTMLElement(cartItem) {
    const td = document.createElement('td');
    td.textContent = cartItem;
    this.createTr.appendChild(td);
  }

  quantityLess(cartItem, divQuantity, Pquantity) {
    const buttonLess = document.createElement('p');
    buttonLess.setAttribute('class', 'addMinus');
    buttonLess.textContent = '-';
    divQuantity.appendChild(buttonLess);

    buttonLess.addEventListener('click', (e) => {
      if (cartItem.quantity === 1) {
        this.deleteItem(cartItem);
      } else {
        cartItem.quantity--;
        this.setItem();
        Pquantity.textContent = cartItem.quantity;
        this.updateTotal('Total: ');
      }
    })
  }

  quantityMore(cartItem, divQuantity, Pquantity) {
    const buttonAdd = document.createElement('p');
    buttonAdd.setAttribute('class', 'addMinus');
    buttonAdd.textContent = '+';
    divQuantity.appendChild(buttonAdd);

    buttonAdd.addEventListener('click', (e) => {
      cartItem.quantity++;
      this.setItem();
      Pquantity.textContent = cartItem.quantity;
      this.updateTotal('Total: ');
    })
  }

  cartQuantity(cartItem) {
    const tdQuantity = document.createElement('td');
    this.createTr.appendChild(tdQuantity);
    const divQuantity = document.createElement('div');
    divQuantity.setAttribute('class', 'adjustQuantity');
    tdQuantity.appendChild(divQuantity);
    const Pquantity = document.createElement('p');

    this.quantityLess(cartItem, divQuantity, Pquantity);

    Pquantity.textContent = cartItem.quantity;
    divQuantity.appendChild(Pquantity);

    this.quantityMore(cartItem, divQuantity, Pquantity);
  }

  trashcanIcon() {
    const tdDelete = document.createElement('td');
    this.createTr.appendChild(tdDelete);
    const createIcon = document.createElement('i');
    createIcon.setAttribute("class", "far fa-trash-alt removeProduct");
    tdDelete.appendChild(createIcon);

    createIcon.addEventListener('click', (e) => {
      this.deleteItem();
    })
  }

  updateTotal(text) {
    const getPTotal = document.querySelector('.total');
    let cartTotal = 0;
    this.cartContent.forEach(cartItem => {
      cartTotal += parseInt(cartItem.quantity) * parseInt(cartItem.price);
    })
    getPTotal.textContent = text + cartTotal + '€';
  }

  deleteItem(cartItem) {
    const index = this.cartContent.indexOf(cartItem);
    this.cartContent.splice(index, 1);
    this.setItem();
    window.location.reload();
  }

  cartItems() {
    let getTbody = document.querySelector('#details-article');
    if (this.cartContent < [0]) {
      let ifEmpty = document.querySelector('.cartIsEmpty');
      ifEmpty.style.display = 'unset';
    } else {
      for (let cartItem of this.cartContent) {
        this.createTr = document.createElement('tr');
        this.createTr.setAttribute('class', 'createTr');
        getTbody.appendChild(this.createTr);
  
        this.cartHTMLElement(cartItem.name);
        this.cartHTMLElement(cartItem.color);
        this.cartQuantity(cartItem);
        this.cartHTMLElement(cartItem.price);
        this.trashcanIcon();
        this.updateTotal('Total: ');
      }
    }
  }

  emptyCart() {
    const buttonEmptyCart = document.querySelector('.emptyCart');
    buttonEmptyCart.addEventListener('click', (e) => {
      localStorage.clear();
      window.location.reload();
    })
  }

  checkFormInput() {
    let checkString = /[a-zA-Z\s\-]{3,}/;
    let checkEmail = /.+@.+\..+/;
    let checkAddress = /\d{1,5}[a-zA-Z0-9\s]/;
    let formLastName = document.getElementById("formLastName").value;
    let formFirstName = document.getElementById("formFirstName").value;
    let formAddress = document.getElementById("formAddress").value;
    let formCity = document.getElementById("formCity").value;
    let formEmail = document.getElementById("formEmail").value;

    if (!checkString.test(formLastName)) {
      alert('Veuillez renseigner votre nom');
      return false;
    } else if (!checkString.test(formFirstName)) {
      alert('Veuillez renseigner votre prénom');
      return false;
    } else if (!checkEmail.test(formEmail)) {
      alert('Votre email doit être au format xxx@yyy.zzz');
      return false;
    } else if (!checkAddress.test(formAddress)) {
      alert('Veuillez renseigner votre adresse');
      return false;
    } else if (!checkString.test(formCity)) {
      alert('Veuillez renseigner le nom de votre ville');
      return false;
    } else {
      return true;
    }
  }

  fetchRequest(contactProducts) {
    let JSONContactProducts = JSON.stringify(contactProducts);
    (async () => {
      fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
          'Accept': 'application/JSON',
          'Content-Type': 'application/JSON'
        },
        body: JSONContactProducts,
      }).then((response) => {
        return response.json();
      }).then((data) => {
        localStorage.setItem('order', JSON.stringify(data));
        document.location.href = "confirmation.html"
      });
    })
    ();
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
        this.fetchRequest(contactProducts);
      }
    })
  }

  resultOrder() {
    if (localStorage.getItem("order") != null) {
      this.contactProducts = JSON.parse(localStorage.getItem("order"));
      document.querySelector("#orderID").innerHTML = 'Numéro de votre commande: ' + this.contactProducts.orderId;
      this.updateTotal('Montant de votre commande: ');
      document.querySelector("#orderLastName").innerHTML = 'Nom: ' + this.contactProducts.contact.lastName;
      document.querySelector("#orderFirstName").innerHTML = 'Prénom: ' + this.contactProducts.contact.firstName;
      document.querySelector("#orderEmail").innerHTML = 'Email: ' + this.contactProducts.contact.email;
      document.querySelector("#orderAddress").innerHTML = 'Adresse: ' + this.contactProducts.contact.address;
      document.querySelector("#orderCity").innerHTML = 'Ville: ' + this.contactProducts.contact.city;
      this.emptyCart();
    }
  }
}