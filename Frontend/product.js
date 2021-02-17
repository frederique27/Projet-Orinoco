const url_string = window.location.href;
const url_product = new URL(url_string);
const id = url_product.searchParams.get("id");
const url = "http://localhost:3000/api/teddies/" + id;
fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
          const singleProduct = new Teddybear(data);
          singleProduct.renderSingleTeddy();
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });