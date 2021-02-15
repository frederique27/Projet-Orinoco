const url_string = window.location.href;
const url_product = new URL(url_string);
const id = url_product.searchParams.get("id");
const url = "http://localhost:3000/api/teddies/" + id;

let request = new XMLHttpRequest();
request.open("GET", url);
request.responseType = "json";
request.send();
request.onload = () => {
  if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      let data = request.response;
      const singleProduct = new Teddybear(data);
      singleProduct.renderSingleTeddy();
  }
};