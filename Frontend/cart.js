const url = "http://localhost:3000/api/teddies";

let request = new XMLHttpRequest();
request.open("GET", url);
request.responseType = "json";
request.send();
request.onload = () => {
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      let data = request.response;

      const cartInfo = new CartObject(data);
      cartInfo.cartItems();
      // cartInfo.totalCart ();
    }
  }
};



