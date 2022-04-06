fetch("http://localhost:3000/api/products").then((response) =>
  response.json().then((data) => {
    console.log(data);

    data.forEach(function (donneesKanap) {
      let eltItem = document.getElementById("items");
      let itemA = document.createElement("a");
      let articleItem = document.createElement("article");
      let imgItem = document.createElement("img");

      let nameItem = document.createElement("h3");
      nameItem.setAttribute("class", "productName");
      let descItem = document.createElement("p");
      descItem.setAttribute("class", "productDescription");

      eltItem.appendChild(itemA);
      itemA.appendChild(articleItem);
      articleItem.appendChild(imgItem);
      articleItem.appendChild(nameItem);
      articleItem.appendChild(descItem);
      let i = 0;
      i < donneesKanap;
      i++;

      nameItem.innerHTML = donneesKanap.name;
      descItem.innerHTML = donneesKanap.description;
      imgItem.src = donneesKanap.imageUrl;
      imgItem.alt = donneesKanap.altTxt;
      itemA.href = "../html/product.html?_id=" + donneesKanap._id;
    });
  })
);
