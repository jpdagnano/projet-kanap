let eltItem = document.getElementById("items");
let itemA = document.createElement("a");
let articleItem = document.createElement("article");
let imgItem = document.createElement("img");
let nameItem = document.createElement("h3");
nameItem.setAttribute("class", "productName");
let descItem = document.createElement("p");
descItem.setAttribute("class", "productDescription");

eltItem.appendChild(itemA);
itemA.appendChild(articleItem);
articleItem.appendChild(imgItem);
articleItem.appendChild(nameItem);
articleItem.appendChild(descItem);
