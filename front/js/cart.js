let donneesKanap = localStorage.getItem("keyKanap");
let donneesParse = JSON.parse(donneesKanap);
console.log(donneesParse);

let color = donneesParse[0].color;
console.log(color);

let template = document.querySelector("template");
console.log(template);
let copieTemplate = document.importNode(template.content, true);
let blocContent = document.getElementById("cartAndFormContainer");
blocContent.appendChild(copieTemplate);
console.log(copieTemplate);