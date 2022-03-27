let dataApi = fetch("http://localhost:3000/api/products");
dataApi.then((response) => {
  const kanapData = response.json();
  console.log(kanapData);

  kanapData.then((fullKanap) => {
    const nomKanap = fullKanap[0].name;
    console.log(nomKanap);
    let nomProduit = document.querySelector(".productName");
    nomProduit.innerHTML = nomKanap;
  });
});
