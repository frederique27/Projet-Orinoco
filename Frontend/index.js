const url = "https://orinoco-oc.herokuapp.com/api/teddies";
fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Problem. Status Code: ' +
          response.status);
        return;
      }
      response.json().then(function(data) {
        for (const teddy of data) {
          const teddybear = new Teddybear(teddy);
          teddybear.renderTeddies();
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error', err);
  });