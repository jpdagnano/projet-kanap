const template = document.querySelector("#template-doc");
let itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
let sommeTotal = 0;

for (let i = 0; i < itemCanap.length; i++) {
  //FONCTION POUR SUPPRESSION ITEM
  function deleteItem(itemCanap, article) {
    itemCanap.forEach((product, index) => {
      if (
        product.id == article.dataset.id &&
        product.color == article.dataset.color
      ) {
        divDelete.parentNode.removeChild(divDelete);
        itemCanap.splice(index, 1);
        localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
        itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
        window.location.reload(sommeTotal);
      }
    });
  }

  const copieTemplate = document.importNode(template.content, true);
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
        article.dataset.id = data._id;
        article.dataset.color = itemCanap[i].color;

        let quantityNumber = parseInt(itemCanap[i].quantite);
        imagePdt.src = data.imageUrl;
        nomCanap.innerHTML = data.name;
        couleurCanap.innerHTML = itemCanap[i].color;
        priceCanap.innerHTML = data.price + " €";
        quantityCanap.value = quantityNumber;
        totalQuantity.innerHTML = itemCanap.length;
        sommeTotal += data.price * quantityNumber;
        totalPrice.innerHTML = sommeTotal;
        // BLOC CONTENT LIGNE DESSOUS
        blocContent.appendChild(copieTemplate);
        //modification quantité dans le local storage si modifié sur page panier
        quantityCanap.addEventListener("change", modifQuantite);
        function modifQuantite() {
          itemCanap[i].quantite = quantityCanap.value;
          localStorage.setItem("keyKanap", JSON.stringify(itemCanap));
          itemCanap = JSON.parse(localStorage.getItem("keyKanap"));
          window.location.reload(sommeTotal);
        }
        deleteButton.addEventListener("click", () => {
          if (itemCanap.length > 1) {
            deleteItem(itemCanap, article);
          } else {
            divDelete.parentNode.removeChild(divDelete);
            localStorage.removeItem("keyKanap");
            window.location.reload(sommeTotal);
          }
        });

        // si positionnement de la ligne imagePdt après la ligne blocContent.appendChild ALORS ERREUR
      })
  );
}
donneesPrenom = document.querySelector("#firstName");
donneesNom = document.querySelector("#lastName");
donneesAdresse = document.querySelector("#address");
donneesVille = document.querySelector("#city");
donneesEmail = document.querySelector("#email");

//REGEX PRENOM
donneesPrenom.addEventListener("change", function () {
  verifPrenom(this);
});
const verifPrenom = function (valeurPrenom) {
  let prenomRegex = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüÿç ]+$");

  let testPrenom = prenomRegex.test(valeurPrenom.value);
  let erreur = document.querySelector("#firstNameErrorMsg");
  if (testPrenom === false) {
    erreur.textContent =
      "Prénom invalide, caractères spéciaux acceptés : à â ä é è ê ë ï î ô ö ù û ü ÿ ç";
  } else {
    erreur.textContent = "";
  }
};
// REGEX NOM
donneesNom.addEventListener("change", function () {
  verifNom(this);
});
const verifNom = function (valeurNom) {
  let nomRegex = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüÿç ]+$");
  let testNom = nomRegex.test(valeurNom.value);
  let erreur = document.querySelector("#lastNameErrorMsg");

  if (testNom === false) {
    erreur.textContent =
      "Nom invalide, caractères spéciaux acceptés : à â ä é è ê ë ï î ô ö ù û ü ÿ ç";
  } else {
    erreur.textContent = "";
  }
};

//REGEX ADRESSE
donneesAdresse.addEventListener("change", function () {
  verifAdresse(this);
});
const verifAdresse = function (valeurAdresse) {
  let adresseRegex = new RegExp("^[0-9a-zA-Z-àâäéèêëïîôöùûüÿç ]+$");
  let testAdresse = adresseRegex.test(valeurAdresse.value);
  let erreur = document.querySelector("#addressErrorMsg");

  if (testAdresse === false) {
    erreur.textContent =
      "Adresse invalide, caractères spéciaux acceptés : à â ä é è ê ë ï î ô ö ù û ü ÿ ç";
  } else {
    erreur.textContent = "";
  }
};

//REGEX VILLE
donneesVille.addEventListener("change", function () {
  verifVille(this);
});
const verifVille = function (valeurVille) {
  let villeRegex = new RegExp("^[a-zA-Z- ]+$");
  let testVille = villeRegex.test(valeurVille.value);
  let erreur = document.querySelector("#cityErrorMsg");

  if (testVille === false) {
    erreur.textContent =
      "Ville invalide, pas de caractères spéciaux ni d'accents acceptés";
  } else {
    erreur.textContent = "";
  }
};

//REGEX E MAIL
donneesEmail.addEventListener("change", function () {
  verifEmail(this);
});
const verifEmail = function (valeurEmail) {
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  let testEmail = emailRegex.test(valeurEmail.value);
  let erreur = document.querySelector("#emailErrorMsg");

  if (testEmail === false) {
    erreur.textContent = "Email invalide, format accepté : xxx@xxx.com/fr...";
  } else {
    erreur.textContent = "";
  }
};

///ENVOI REQUETE FORMULAIRE
const inputBtn = document.querySelector("#order");

function calculId() {
  let canapId = [];
  itemCanap.forEach((item, index) => {
    canapId.push(itemCanap[index].id);
  });
  return canapId;
}
function donneesClientArray() {
  let infoClient = {
    firstName: donneesPrenom.value,
    lastName: donneesNom.value,
    address: donneesAdresse.value,
    city: donneesVille.value,
    email: donneesEmail.value,
  };
  return infoClient;
}
function RedirectionConfirmation(orderId) {
  document.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?orderid=${orderId}`;
}
inputBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const donneesEnvoi = {
    products: calculId(),
    contact: donneesClientArray(),
  };
  if (
    donneesPrenom.value == false ||
    donneesNom.value == false ||
    donneesAdresse.value == false ||
    donneesVille.value == false ||
    donneesEmail.value == false
  ) {
    alert("Formulaire incomplet");
  } else {
    const reponseServ = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donneesEnvoi),
    })
      .then((response) => response.json())
      .then((data) => {
        RedirectionConfirmation(data.orderId);
      });
  }
});
