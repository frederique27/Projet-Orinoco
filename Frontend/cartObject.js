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
 
  cartItems() {
    let getTbody = document.querySelector('#details-article');

    const getPTotal = document.querySelector('.total');
    let totalPrice = 0;

    for(let cartItem of this.cartContent) {
      const createTr = document.createElement('tr');
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

      buttonLess.addEventListener('click', (e) => {
          cartItem.quantity--;
          localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
          Pquantity.textContent = cartItem.quantity;
          window.location.reload();
        if (cartItem.quantity === 0) {
          const id = this.cartContent.indexOf(cartItem);
          const removedDrink = this.cartContent.splice(id,  1); 
          localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
          window.location.reload();
        }
      })

      buttonAdd.addEventListener('click', (e) => {
        cartItem.quantity++;
        localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
        Pquantity.textContent = cartItem.quantity;
        window.location.reload();
      })
      
      const tdPrice = document.createElement('td');
      tdPrice.textContent = cartItem.price;
      createTr.appendChild(tdPrice);

      let parsePrice = parseInt(cartItem.price);
      let parseQuantity = parseInt(cartItem.quantity);
      totalPrice += parseInt(parsePrice*parseQuantity);
      getPTotal.textContent = 'Total  ' + '€' + totalPrice;

      const tdDelete = document.createElement('td');
      tdDelete.setAttribute('class', 'tdDelete');
      createTr.appendChild(tdDelete);
      const createIcon = document.createElement('i');
      createIcon.setAttribute("class", "far fa-trash-alt removeProduct");
      tdDelete.appendChild(createIcon);

      createIcon.addEventListener('click', (e) => {
        const id = this.cartContent.indexOf(cartItem);
          const removedchose = this.cartContent.splice(id,  1); 
          localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
          window.location.reload();
      })     
    }
  }

  emptyCart() {
    const buttonEmptyCart = document.querySelector('#emptyCart');

    buttonEmptyCart.addEventListener('click', (e) => {
        localStorage.clear();
        window.location.reload();
    })
  }
}
