// QUICK SORT LOMUTO : trie recettes par nom
// echange position elements
function swap(recipes, i, j) {
  var temp = recipes[i].name;
  recipes[i].name = recipes[j].name;
  recipes[j].name = temp;
}

function quicksortLomuto(recipes, left, right) {
  left = left || 0; // index du 1er element
  right = right || recipes.length - 1; // index du dernier element

  // pivot = element separant le tableau en 2 parties
  var pivot = partitionLomuto(recipes, left, right);

  if (left < pivot - 1) {
    quicksortLomuto(recipes, left, pivot - 1);
  }

  if (right > pivot) {
    quicksortLomuto(recipes, pivot - 1, right);
  }

  return recipes;
}

function partitionLomuto(recipes, left, right) {
  // algorithme Lomuto : utilise toujours le dernier element comme pivot
  var pivot = right;
  var i = left;

  // Le tri commence à partir de l'élément le plus à gauche
  // Une trace de l'index des éléments <= est conservee
  // Si un élément est plus petit, il est echange avec l'élément courant
  // Sinon, l'élément actuel est ignoré.
  for (var j = left; j < right; j++) {
    if (recipes[j].name <= recipes[pivot].name) {
      swap(recipes, i, j);
      i++;
    }
  }
  swap(recipes, i, j);
  return i;
}

// ---------------------------------
// QUICK SORT LOMUTO : tri generique
function swapGeneric(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function quicksortGeneric(array, left, right) {
  left = left || 0;
  right = right || array.length - 1;

  var pivot = partitionGeneric(array, left, right);

  if (left < pivot - 1) {
    quicksortGeneric(array, left, pivot - 1);
  }

  if (right > pivot) {
    quicksortGeneric(array, pivot - 1, right);
  }

  return array;
}

function partitionGeneric(array, left, right) {
  var pivot = right;
  var i = left;


  for (var j = left; j < right; j++) {
    if (array[j] <= array[pivot]) {
      swapGeneric(array, i, j);
      i++;
    }
  }
  swapGeneric(array, i, j);
  return i;
}
