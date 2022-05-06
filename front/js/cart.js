let donneesParse = JSON.parse(localStorage.getItem("keyKanap"));

console.log(donneesParse);

donneesParse.forEach((donnees, index) => {
  let template = document.querySelector("template");
  console.log(index, donnees);
  let copieTemplate = document.importNode(template.content, true);
  let blocContent = document.getElementById("cart__items");
  blocContent.appendChild(copieTemplate);
  const article = document.querySelector(".cart__item");

  let i = 0;
  let artDataset = donneesParse[i].id;

  fetch("http://localhost:3000/api/products/" + donnees.id).then((response) =>
    response.json().then((data) => {
      console.log(data);
    })
  );
  i < donneesParse.lenght;
  i++;
});
