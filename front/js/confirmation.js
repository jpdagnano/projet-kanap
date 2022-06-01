const pageIdWindow = window.location.search;

const globalUrl = new URLSearchParams(pageIdWindow);

const numberOrder = globalUrl.get("orderid");

let order = document.querySelector("#orderId");

order.textContent = numberOrder;
