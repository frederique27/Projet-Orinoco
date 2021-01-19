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
    console.log(this.cartContent);

    for(let cartItem of this.cartContent) {
      const createTr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.textContent = cartItem.name;
      createTr.appendChild(tdName);
      const tdColor = document.createElement('td');
      tdColor.textContent = cartItem.color;
      createTr.appendChild(tdColor);
      const tdQuantity = document.createElement('td');
      tdQuantity.textContent = cartItem.quantity;
      createTr.appendChild(tdQuantity);
      getTbody.appendChild(createTr);
      const tdPrice = document.createElement('td');
      tdPrice.textContent = cartItem.price;
      createTr.appendChild(tdPrice);
    }
  }

  deleteValidateCart() {
    const getDivArticle = document.querySelector('#article');
    const divEmptyValidate = document.createElement('div');
    getDivArticle.appendChild(divEmptyValidate);
    const buttonEmptyCart = document.createElement('button');
    buttonEmptyCart.setAttribute('type', 'button');
    buttonEmptyCart.setAttribute('class', 'btn btn-outline-secondary btnCart');
    buttonEmptyCart.innerHTML = "Vider mon panier";
    divEmptyValidate.appendChild(buttonEmptyCart);
    const buttonValidateCart = document.createElement('button');
    buttonValidateCart.setAttribute('type', 'button');
    buttonValidateCart.setAttribute('class', 'btn btn-outline-secondary btnCart');
    buttonValidateCart.innerHTML = "Valider mon panier";
    divEmptyValidate.appendChild(buttonValidateCart);

    buttonEmptyCart.addEventListener('click', function(e) {
        localStorage.clear();
        window.location.reload();
    })

    buttonValidateCart.addEventListener('click', function(e) {
      // localStorage.clear();
      // window.location.reload();
    })
  }
}

// const getDivArticle = document.querySelector('#article');
    // const createTotal = document.createElement('p');
    // let number = 0;

    // for(let i = 0; i < this.cartContent.length; i++) {
    //   const createTr = document.createElement('tr');
    //   getTbody.appendChild(createTr);
    //   for(let j = 0; j < this.cartContent[i].length; j++) {
    //     console.log(this.cartContent[i][j]);
    //     const createTh = document.createElement('th');
    //     createTh.setAttribute = ('scope', 'row');
    //     createTh.textContent = this.cartContent[i][j];
    //     createTr.appendChild(createTh);
    //   }
      // number += parseInt(this.cartContent[i][2]);
      // createTotal.textContent = 'Total = ' + number + '€';
      // getDivArticle.appendChild(createTotal);
    // }

