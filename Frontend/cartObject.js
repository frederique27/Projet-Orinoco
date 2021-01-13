class CartObject {
  constructor(data) {
    this.cartContent = [];
    this.name = data.name;
    this.colorChosen = document.querySelector(".colorSelect");
    this.price = data.price / 100 + ",00€";
  }  
  addToCart () {
    if (localStorage.getItem('cartContent') == null) {
      this.cartContent = [];
    }
    else {
      this.cartContent = JSON.parse(localStorage.getItem('cartContent'));
    }

    this.cartContent.push(this.name, this.colorChosen.value, this.price);
    localStorage.setItem('cartContent', JSON.stringify(this.cartContent));
  }

  cartItems () {
    let createTbody = document.querySelector('#details-article');
    let createTr = document.createElement('tr');
    createTbody.appendChild(createTr);
    
    let retrievedContent = localStorage.getItem("cartContent");
    let parsedContent = JSON.parse(retrievedContent)

    for(let i = 0; i < parsedContent.length; i++) {
      const createTd = document.createElement('td');
      createTd.setAttribute = ('scope', 'row');
      createTd.textContent = parsedContent[i];
      createTr.appendChild(createTd);
    }
  }
}

