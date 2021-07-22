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
  // et conserve une trace de l'index des éléments <=
  // Si un élément est plus petit, il est echange avec l'élément courant avec arr[j].
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

// ----------------------------------------
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
    quicksortGeneric(array, pivot, right);
  }

  return array;
}

function partitionGeneric(array, left, right) {
  var pivot = Math.floor((left + right) / 2);

  while (left < right) {
    while (array[left] < array[pivot]) {
      left++;
    }
    while (array[right] > array[pivot]) {
      right--;
    }

    if (left <= right) {
      swapGeneric(array, left, right);
      left++;
      right--;
    }
  }
  return left;
}
