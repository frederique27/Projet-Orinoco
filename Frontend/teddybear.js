class Teddybear {
  constructor(data) {
    this.i = 0;
    this.img = data.imageUrl;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price / 100 + ",00€";
    this.id = data._id;
    this.colors = data.colors;
    this.teddyContent = document.getElementById("teddybears");
    this.teddyCard = document.createElement('div');
  }

  insertImg () {
    this.teddyCard.setAttribute('class', 'card col shadow text-center');
    this.teddyContent.appendChild(this.teddyCard);

    const createImg = document.createElement('img');
    createImg.setAttribute('src', this.img);
    createImg.setAttribute('alt', this.name);
    createImg.setAttribute('class', 'card-img-top');
    
    this.teddyCard.appendChild(createImg);
  }

  insertName() {
    const teddyName = document.createElement('h5');
    teddyName.setAttribute('class', 'card-title');
    teddyName.innerHTML = this.name;

    this.teddyCard.appendChild(teddyName);
  }

  insertDescription () {
    const teddyDescription = document.createElement('p');
    teddyDescription.setAttribute('class', 'card-text');
    teddyDescription.innerHTML = this.description;

    this.teddyCard.appendChild(teddyDescription);
  }

  insertPrice () {
    const teddyPrice = document.createElement('p');
    teddyPrice.setAttribute('class', 'card-text');
    teddyPrice.innerHTML = this.price;

    this.teddyCard.appendChild(teddyPrice);
  }

  insertColor () {
    const createLabel = document.createElement('label');
    createLabel.setAttribute('for', 'color-list');
    createLabel.textContent = 'Couleurs disponibles: ';

    this.teddyCard.appendChild(createLabel);

    const createSelect = document.createElement('select');
    createSelect.setAttribute('class', 'form-control-sm colorSelect');

    createLabel.appendChild(createSelect);

    for(let i = 0; i < this.colors.length; i++) {
      const createOption = document.createElement('option');
      createOption.textContent = this.colors[i];
      createOption.setAttribute('value', this.colors[i]);
      createOption.setAttribute('required', '');
      createSelect.appendChild(createOption);
    }
  }

  insertBtnSeeProduct () {
    const divCardFooter = document.createElement('div');
    divCardFooter.setAttribute('class', 'card-footer');

    this.teddyCard.appendChild(divCardFooter);

    const btnSeeProduct = document.createElement('a');
    btnSeeProduct.setAttribute('type', 'button');
    btnSeeProduct.setAttribute('class', 'btn btn-outline-secondary');
    btnSeeProduct.setAttribute('href', 'product.html?id=' + this.id );
    btnSeeProduct.innerHTML = 'Voir le produit';

    divCardFooter.appendChild(btnSeeProduct);
  }

  insertBtnAddCart () {
    const divCardFooter = document.createElement('div');
    divCardFooter.setAttribute('class', 'card-footer');

    this.teddyCard.appendChild(divCardFooter);

    const btnAddCart = document.createElement('a');
    btnAddCart.setAttribute('class', 'btn btn-outline-secondary addToCart');
    btnAddCart.setAttribute('href', 'cart.html?id=' + this.id );

    btnAddCart.innerHTML = 'Ajouter au panier';

    divCardFooter.appendChild(btnAddCart);
  }
  
  renderTeddies () {
    this.insertImg();
    this.insertName();
    this.insertDescription();
    this.insertPrice();
    this.insertBtnSeeProduct();
  }

  renderSingleTeddy() {
    this.insertImg();
    this.insertName();
    this.insertDescription();
    this.insertPrice();
    this.insertColor();
    this.insertBtnAddCart();
  }
        
}