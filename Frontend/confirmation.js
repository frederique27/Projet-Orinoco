const order = new CartObject();
order.resultOrder();
const order2 = JSON.parse(localStorage.getItem('order'));
console.log(order2);