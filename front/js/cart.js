let donneesParse = JSON.parse(localStorage.getItem("keyKanap"));

console.log(donneesParse);

donneesParse.forEach(() => {
  let template = document.querySelector("template");

  let copieTemplate = document.importNode(template.content, true);
  let blocContent = document.getElementById("cart__items");
  blocContent.appendChild(copieTemplate);
  const article = document.querySelector(".cart__item");

  let i = 0;
  let artDataset = donneesParse[i].id;
  fetch("http://localhost:3000/api/products/" + artDataset).then((response) =>
    response.json().then((data) => {
      console.log(data);
   
    })
  );
});
