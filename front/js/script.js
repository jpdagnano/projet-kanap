let dataApi = fetch("http://localhost:3000/api/products");
dataApi.then((response) => {
  const kanapData = response.json();
  console.log(kanapData);
});

let nomProduit = document.querySelector(".productName");
nomProduit.innerHTML = "<p>je change le texte</p>";
