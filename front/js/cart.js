const donneesParse = JSON.parse(localStorage.getItem("keyKanap"));
const template = document.querySelector("#template-doc");
let itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
console.log(donneesParse);
for (let i = 0; i < donneesParse.length; i++) {
  const copieTemplate = document.importNode(template.content, true);
  //const copieTemplate = template.content.cloneNode(true);
  const blocContent = document.getElementById("cart__items");
  fetch("http://localhost:3000/api/products/" + donneesParse[i].id).then(
    (response) =>
      response.json().then((data) => {
        const imagePdt = copieTemplate.children[0].querySelector("img");
        const nomCanap = copieTemplate.querySelector(
          ".cart__item__content__description > h2"
        );
        const couleurCanap = copieTemplate.querySelector(
          ".cart__item__content__description > p"
        );
        const priceCanap = copieTemplate.querySelector(
          ".cart__item__content__description p:nth-child(3)"
        );
        const quantityCanap = copieTemplate.querySelector(
          ".cart__item__content__settings__quantity >input"
        );

        const article = copieTemplate.querySelector(".cart__item");
        article.dataset.dataId = data._id;
        article.dataset.dataColor = donneesParse[i].color;

        let quantityNumber = parseInt(donneesParse[i].quantite);
        let sommeTotal = copieTemplate.querySelector("#totalPrice");
        imagePdt.src = data.imageUrl;
        nomCanap.innerHTML = data.name;
        couleurCanap.innerHTML = donneesParse[i].color;
        priceCanap.innerHTML = data.price + " €";
        quantityCanap.value = quantityNumber;
        sommeTotal = data.price * quantityNumber;

        //modification quantité dans le local storage si modifié sur page panier
        quantityCanap.addEventListener("change", modifQuantite);
        function modifQuantite() {
          itemCanap[i].quantite = quantityCanap.value;
          localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
          itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
        }
        // si positionnement de la ligne imagePdt après la ligne blocContent.appendChild ALORS ERREUR
        blocContent.appendChild(copieTemplate);
      })
  );
}
