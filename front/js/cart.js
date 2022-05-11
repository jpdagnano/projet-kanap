const donneesParse = JSON.parse(localStorage.getItem("keyKanap"));
const template = document.querySelector("#template-doc");

for (let i = 0; i < donneesParse.length; i++) {
  const copieTemplate = document.importNode(template.content, true);
  console.log(copieTemplate);
  const blocContent = document.getElementById("cart__items");
  blocContent.appendChild(copieTemplate);
  fetch("http://localhost:3000/api/products/" + donneesParse[i].id).then(
    (response) =>
      response.json().then((data) => {
        let imgProduit = copieTemplate.querySelector(".cart__item__img > img");
        console.log(imgProduit);
        imgProduit.src = data.imageUrl;
        console.log(imgProduit.src);
      })
  );
}
