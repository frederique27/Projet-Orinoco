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
    
    let retrievedContent = localStorage.getItem("cartContent");
    let parsedContent = JSON.parse(retrievedContent)

    let perChunk = 3 // items per chunk    
    let result = parsedContent.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/perChunk)
    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
    }, [])
    console.log(result);

    const getDivArticle = document.querySelector('#article');
    const createTotal = document.createElement('p');
    let number = 0;

    for(let i = 0; i < result.length; i++) {
      const createTr = document.createElement('tr');
      createTbody.appendChild(createTr);
      for(let j = 0; j < result[i].length; j++) {
        const createTh = document.createElement('th');
        createTh.setAttribute = ('scope', 'row');
        createTh.textContent = result[i][j];
        createTr.appendChild(createTh);
      }
      number += parseInt(result[i][2]);
      createTotal.textContent = 'Total = ' + number + '€';
      getDivArticle.appendChild(createTotal);
    }
  }
}

