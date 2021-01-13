const url = "http://localhost:3000/api/teddies";

let request = new XMLHttpRequest();
request.open("GET", url);
request.responseType = "json";
request.send();
request.onload = () => {
  if (request.readyState === XMLHttpRequest.DONE) {
    if (request.status === 200) {
      let data = request.response;
      
      for (const teddy of data) {
        const teddybear = new Teddybear(teddy);
        teddybear.renderTeddies();
      }
    }
  }
};
