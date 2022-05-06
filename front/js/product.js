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
      let quantity = document.getElementById("quantity");
      let color = document.getElementById("colors");
      let donneesLocalS = {
        id: pageId,
        color: color.value,
        quantite: quantity.value,
      };
      if (itemCanap == null) {
        itemCanap = [];
        itemCanap.push(donneesLocalS);
        localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
      } else if (itemCanap != null) {
        itemCanap.forEach((elem, index) => {
          console.log("elem");
        });
      }
    });
  })
);
