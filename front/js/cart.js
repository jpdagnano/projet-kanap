let donneesKanap = localStorage.getItem("keyKanap");
let donneesParse = JSON.parse(donneesKanap);
console.log(donneesParse);

donneesParse.forEach((objets) => {
  let template = document.querySelector("template");
  console.log(donneesParse);

  let copieTemplate = document.importNode(template.content, true);
  let blocContent = document.getElementById("cart__items");
  blocContent.appendChild(copieTemplate);
  const article = document.querySelector(".cart__item");
  console.log(article);
  let artDataset = donneesParse[0].id;
  fetch("http://localhost:3000/api/products/" + artDataset).then((response) =>
    response.json().then((data) => {
      console.log(data);
      let i = 0;
      i < donneesParse;
      artDataset++;
      i++;
    })
  );
});
