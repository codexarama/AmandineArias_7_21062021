// ALGORITHME DE TRI
// METHODE QUICK SORT BASIC (sans utiliser fonction d'echange et de partition)
function quickSort(recipes) {
  // stop boucle si reste 1 seul element
  if (recipes.length < 2) return recipes;
  // valeur pivot
  let pivot = recipes[0];
  // sous-tableau elements < pivot
  let lesser = [];
  // sous-taleau elements > pivot
  let greater = [];
  // boucle sur tableau recettes
  for (let i = 1; i < recipes.length; i++) {
    // quick sort sur noms recettes
    if (recipes[i].name > pivot.name) greater.push(recipes[i]);
    else lesser.push(recipes[i]);
  }
  // fusion des 2 sous-tableaux
  return quickSort(lesser).concat(pivot, quickSort(greater));
}
