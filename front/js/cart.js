//CREATION STRUCTION DOM
let articleCart = document.createElement("article");
articleCart.setAttribute("class", "cart--item");
articleCart.setAttribute("data-id", "idamettre");
articleCart.setAttribute("date-color", "couleuramettre");
let sectionCart = document.getElementById("cart__items");
sectionCart.appendChild(articleCart);

let divImg = document.createElement("div");
divImg.setAttribute("class", "cart__item__img");
articleCart.appendChild(divImg);
let kanapImg = document.createElement("img");
kanapImg.src = "";
kanapImg.alt = "";
divImg.appendChild(kanapImg);

let divItem = document.createElement("div");
divItem.setAttribute("class", "cart__item__content");
articleCart.appendChild(divItem);

let divItemDescription = document.createElement("div");
divItemDescription.setAttribute("class", "cart__item__content__description");
divItem.appendChild(divItemDescription);

let nameProduct = document.createElement("h2");
divItemDescription.appendChild(nameProduct);

let colorP = document.createElement("p");
divItemDescription.appendChild(colorP);

let priceP = document.createElement("p");
divItemDescription.appendChild(priceP);

let itemSettings = document.createElement("div");
itemSettings.setAttribute("class", "cart__item__content__settings");
articleCart.appendChild(itemSettings);

let itemSettingsQuantity = document.createElement("div");
itemSettingsQuantity.setAttribute(
  "class",
  "cart__item__content__settings__quantity"
);
itemSettings.appendChild(itemSettingsQuantity)
;
