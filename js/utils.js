// CREATION DOM ELEMENTS
// FACTORY METHOD : type + attributes + nodes
const elmtFactory = (type, attribute, ...children) => {
  let elmt = document.createElement(type);

  for (key in attribute) {
    elmt.setAttribute(key, attribute[key]);
  }

  children.forEach((child) => {
    if (typeof child === 'string')
      elmt.appendChild(document.createTextNode(child));
    else elmt.appendChild(child);
  });

  return elmt;
};

// TRIE CARTES RECETTES (ordre alphabetique)
// AFFICHE CARTES RECETTES
function displaySortedRecipes(recipes) {
  quicksortLomuto(recipes, 0, recipes.length - 1);
  console.log(quicksortLomuto(recipes, 0, recipes.length - 1));

  for (let i = 0; i < recipes.length; i++) {
    setRecipe(recipes[i]);
  }
}

// NORMALISE TEXTE
const normString = (string) => {
  string = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  string = string.toLowerCase();

  string = string
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .replace(/[']/g, " ");

  return string;
};