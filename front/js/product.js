const pageIdWindow = window.location.search;

const longId = new URLSearchParams(pageIdWindow);
const pageId = longId.get("_id");
console.log(pageId);

function checkProductCart(panier, productToAdd) {
  let isIn = -1;
  panier.forEach((product, index) => {
    if (product.id == productToAdd.id && product.color == productToAdd.color) {
      isIn = index;
    }
  });
  return isIn;
}
fetch("http://localhost:3000/api/products/" + pageId).then((response) =>
  response.json().then((data) => {
    console.log(data);
    let price = document.getElementById("price");
    price.innerHTML = data.price;
    let nomProduit = document.getElementById("title");
    nomProduit.textContent = data.name;

    let description = document.getElementById("description");
    description.innerHTML = data.description;
    let datacolor = data.colors;
    let imgItem = document.createElement("img");
    let divImg = document.querySelector(".item__img");
    divImg.appendChild(imgItem);
    imgItem.src = data.imageUrl;
    imgItem.alt = data.altTxt;
    datacolor.forEach(function (fullcolor) {
      let divcolor = document.getElementById("colors");
      let optioncolor = document.createElement("option");
      divcolor.appendChild(optioncolor);
      optioncolor.setAttribute("value", fullcolor);
      optioncolor.innerHTML = fullcolor;
    });
    let boutonAjouter = document.getElementById("addToCart");
    boutonAjouter.addEventListener("click", () => {
      let itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
      let quantite = document.getElementById("quantity");
      let color = document.getElementById("colors");
      let donneesAttente = {
        id: pageId,
        color: color.value,
        quantite: quantite.value,
      };
      if (
        itemCanap == null &&
        donneesAttente.quantite != "0" &&
        donneesAttente.color != "" &&
        donneesAttente.quantite <= 100
      ) {
        itemCanap = [];
        itemCanap.push(donneesAttente);
        localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
        itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
      } else if (donneesAttente.quantite == "0" || donneesAttente.color == "") {
        alert("Merci de selectionner une couleur/une quantit?? >0");
      } else if (donneesAttente.quantite > 100) {
        alert("Merci de modifier la quantit??, maximum 100 canap??s");
      } else if (
        itemCanap != null &&
        donneesAttente.quantite != "0" &&
        donneesAttente.color != ""
      ) {
        let indexProduct = checkProductCart(itemCanap, donneesAttente);
        console.log(indexProduct);
        if (indexProduct >= 0) {
          let qtyParseA = parseInt(donneesAttente.quantite);
          let qtyParseB = parseInt(itemCanap[indexProduct].quantite);
          itemCanap[indexProduct].quantite = qtyParseA + qtyParseB;
          localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
          itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
        } else {
          itemCanap.push(donneesAttente);
          localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
          itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
        }
      }
    });
  })
);
