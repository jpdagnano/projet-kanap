const pageIdWindow = window.location.search;

const longId = new URLSearchParams(pageIdWindow);
const pageId = longId.get("_id");
console.log(pageId);

fetch("http://localhost:3000/api/products/" + pageId).then((response) =>
  response.json().then((data) => {
    console.log(data);
    let price = document.getElementById("price");
    price.innerHTML = data.price;

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
      if (itemCanap == null) {
        itemCanap = [];
        itemCanap.push(donneesAttente);
        localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
        itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
      } else if (itemCanap != null) {
        itemCanap.forEach((elem) => {
          let qtyParseA = parseInt(donneesAttente.quantite);
          let qtyParseB = parseInt(elem.quantite);
          if (
            elem.id == donneesAttente.id &&
            elem.color == donneesAttente.color
          ) {
            elem.quantite = qtyParseA + qtyParseB;
            localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
            itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
            console.log("choix 1");
          } else {
            parseInt(donneesAttente.quantite);
            itemCanap.push(donneesAttente);
            localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
            itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
            console.log("choix 2");
          }
        });
      }
    });
  })
);
