const donneesParse = JSON.parse(localStorage.getItem("keyKanap"));
const template = document.querySelector("#template-doc");
let itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
let sommeTotal = 0;

function delItem(elem) {
  Element.remove();
}
for (let i = 0; i < itemCanap.length; i++) {
  const copieTemplate = document.importNode(template.content, true);
  //const copieTemplate = template.content.cloneNode(true);
  const blocContent = document.getElementById("cart__items");
  let divDelete = copieTemplate.querySelector(".cart__item");
  fetch("http://localhost:3000/api/products/" + itemCanap[i].id).then(
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
        const totalPrice = document.querySelector("#totalPrice");
        const deleteButton = copieTemplate.querySelector(".deleteItem");
        let totalQuantity = document.querySelector("#totalQuantity");

        const article = copieTemplate.querySelector(".cart__item");
        article.dataset.dataId = data._id;
        article.dataset.dataColor = itemCanap[i].color;

        let quantityNumber = parseInt(itemCanap[i].quantite);
        imagePdt.src = data.imageUrl;
        nomCanap.innerHTML = data.name;
        couleurCanap.innerHTML = itemCanap[i].color;
        priceCanap.innerHTML = data.price + " €";
        quantityCanap.value = quantityNumber;
        totalQuantity.innerHTML = itemCanap.length;
        sommeTotal += data.price * quantityNumber;
        totalPrice.innerHTML = sommeTotal;
        console.log(itemCanap.length);

        //modification quantité dans le local storage si modifié sur page panier
        quantityCanap.addEventListener("change", modifQuantite);
        function modifQuantite() {
          itemCanap[i].quantite = quantityCanap.value;
          localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
          itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
          window.location.reload();
        }
        deleteButton.addEventListener("click", () => {
          if (itemCanap.length > 1) {
            let index = itemCanap.indexOf(i);
            console.log(index);
            divDelete.parentNode.removeChild(divDelete);
            itemCanap.splice(index, 1);
            localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
            itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
            window.location.reload();
          } else {
            divDelete.parentNode.removeChild(divDelete);
            localStorage.removeItem("keyKanap");
          }

          // si positionnement de la ligne imagePdt après la ligne blocContent.appendChild ALORS ERREUR

          //blocContent.parentNode.removeChild(blocContent);
        });
        blocContent.appendChild(copieTemplate);
      })
  );
}
