const dateApi = fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.table(value);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

let elements = document.getElementById("items");
elements.innetHTML = dateApi;
